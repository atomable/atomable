'use strict';

const lookupCommand = require('./lookup-command');
const Promise = require('../ext/promise');
const getOptionArgs = require('../utilities/get-option-args');
const logger = require('heimdalljs-logger')('ember-cli:cli');
const loggerTesting = require('heimdalljs-logger')('ember-cli:testing');

/**
 * @private
 * @class CLI
 * @constructor
 * @param options
 */
function CLI(options) {
  /**
   * @private
   * @property name
   */
  this.name = options.name;

  /**
   * @private
   * @property ui
   * @type UI
   */
  this.ui = options.ui;

  /**
   * @private
   * @property analytics
   */
  this.analytics = options.analytics;

  /**
   * @private
   * @property testing
   * @type Boolean
   */
  this.testing = options.testing;

  /**
   * @private
   * @property disableDependencyChecker
   * @type Boolean
   */
  this.disableDependencyChecker = options.disableDependencyChecker;

  /**
   * @private
   * @property root
   */
  this.root = options.root;

  /**
   * @private
   * @property npmPackage
   */
  this.npmPackage = options.npmPackage;

  logger.info('testing %o', !!this.testing);
}

module.exports = CLI;

/**
 * @private
 * @method run
 * @param environment
 * @return {Promise}
 */
CLI.prototype.run = function (environment) {

  return Promise.hash(environment)
    .then((environment) => {
      const args = environment.cliArgs.slice();
      const commandName = args.shift();
      const commandArgs = args;
      let helpOptions;

      const CurrentCommand = lookupCommand(environment.commands, commandName, commandArgs, {
        project: environment.project,
        ui: this.ui,
      });

      const command = new CurrentCommand({
        ui: this.ui,
        analytics: this.analytics,
        commands: environment.commands,
        tasks: environment.tasks,
        project: environment.project,
        settings: environment.settings,
        testing: this.testing,
        cli: this,
      });

      getOptionArgs('--verbose', commandArgs).forEach((arg) => {
        process.env[`EMBER_VERBOSE_${arg.toUpperCase()}`] = 'true';
      });

      logger.info('command: %s', commandName);

      if (!this.testing) {
        process.chdir(environment.project.root);
        const skipInstallationCheck = commandArgs.indexOf('--skip-installation-check') !== -1;
        if (environment.project.isEmberCLIProject() && !skipInstallationCheck) {
          const InstallationChecker = require('../models/installation-checker');
          new InstallationChecker({ project: environment.project }).checkInstallations();
        }
      }

      command.beforeRun(commandArgs);

      return Promise.resolve()
        .then(() => {
          loggerTesting.info('cli: command.validateAndRun');
          return command.validateAndRun(commandArgs);
        }).then((result) => {

          // if the help option was passed, call the help command
          if (result === 'callHelp') {
            helpOptions = {
              environment,
              commandName,
              commandArgs,
            };

            return this.callHelp(helpOptions);
          }

          return result;
        }).then((exitCode) => {
          loggerTesting.info(`cli: command run complete. exitCode: ${exitCode}`);
          // TODO: fix this
          // Possibly this issue: https://github.com/joyent/node/issues/8329
          // Wait to resolve promise when running on windows.
          // This ensures that stdout is flushed so acceptance tests get full output

          return new Promise((resolve) => {
            if (process.platform === 'win32') {
              setTimeout(resolve, 250, exitCode);
            } else {
              resolve(exitCode);
            }
          });
        });
    }).catch(this.logError.bind(this));
};

/**
 * @private
 * @method callHelp
 * @param options
 * @return {Promise}
 */
CLI.prototype.callHelp = function (options) {
  const environment = options.environment;
  const commandName = options.commandName;
  const commandArgs = options.commandArgs;
  const helpIndex = commandArgs.indexOf('--help');
  const hIndex = commandArgs.indexOf('-h');

  const HelpCommand = lookupCommand(environment.commands, 'help', commandArgs, {
    project: environment.project,
    ui: this.ui,
  });

  const help = new HelpCommand({
    ui: this.ui,
    analytics: this.analytics,
    commands: environment.commands,
    tasks: environment.tasks,
    project: environment.project,
    settings: environment.settings,
    testing: this.testing,
  });

  if (helpIndex > -1) {
    commandArgs.splice(helpIndex, 1);
  }

  if (hIndex > -1) {
    commandArgs.splice(hIndex, 1);
  }

  commandArgs.unshift(commandName);

  return help.validateAndRun(commandArgs);
};

/**
 * @private
 * @method logError
 * @param error
 * @return {number}
 */
CLI.prototype.logError = function (error) {
  if (this.testing && error) {
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    throw error;
  }
  this.ui.errorLog.push(error);
  this.ui.writeError(error);
  return 1;
};
