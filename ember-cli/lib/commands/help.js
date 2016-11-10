'use strict';

var Command = require('../models/command');
var lookupCommand = require('../cli/lookup-command');
var stringUtils = require('ember-cli-string-utils');
var assign = require('lodash/assign');

var RootCommand = require('../models/command');

module.exports = Command.extend({
  isRoot: true,
  name: 'ember',

  anonymousOptions: [
    '<command (Default: help)>'
  ]
});

module.exports = Command.extend({
  name: 'help',
  description: 'Outputs the usage instructions for all commands or the provided command',
  aliases: [undefined, 'h', '--help', '-h'],
  works: 'everywhere',

  availableOptions: [
    { name: 'verbose', type: Boolean, default: false, aliases: ['v'] },
    { name: 'json', type: Boolean, default: false }
  ],

  anonymousOptions: [
    '<command-name (Default: all)>'
  ],

  run: function (commandOptions, rawArgs) {
    if (commandOptions.json) {
      this._printJsonHelp(commandOptions, rawArgs);
    } else {
      this._printHelp(commandOptions, rawArgs);
    }
  },

  _printHelp: function (commandOptions, rawArgs) {
    var rootCommand = new RootCommand({
      ui: this.ui,
      project: this.project,
      commands: this.commands,
      tasks: this.tasks
    });

    if (rawArgs.length === 0) {
      // Display usage for all commands.
      this.ui.writeLine('Available commands in ' + process.title + ':');
      this.ui.writeLine('');

      Object.keys(this.commands).forEach(function (commandName) {
        this._printHelpForCommand(commandName, false, commandOptions);
      }, this);

      if (this.project.eachAddonCommand) {
        this.project.eachAddonCommand(function (addonName, commands) {
          this.commands = commands;

          this.ui.writeLine('');
          this.ui.writeLine('Available commands from ' + addonName + ':');

          Object.keys(this.commands).forEach(function (commandName) {
            this._printHelpForCommand(commandName, false, commandOptions);
          }, this);
        }.bind(this));
      }
    } else {
      // If args were passed to the help command,
      // attempt to look up the command for each of them.

      this.ui.writeLine('Requested ' + process.title + ' commands:');
      this.ui.writeLine('');

      if (this.project.eachAddonCommand) {
        this.project.eachAddonCommand(function (addonName, commands) {
          assign(this.commands, commands);
        }.bind(this));
      }

      // Iterate through each arg beyond the initial 'help' command,
      // and try to display usage instructions.
      rawArgs.forEach(function (commandName) {
        this._printHelpForCommand(commandName, true, commandOptions);
      }, this);
    }
  },

  _printHelpForCommand: function (commandName, detailed, options) {
    var command = this._lookupCommand(commandName);

    if (!command.skipHelp || detailed) {
      this.ui.writeLine(command.printBasicHelp(options));
    }

    if (detailed) {
      command.printDetailedHelp(options);
    }
  },

  _lookupCommand: function (commandName) {
    var Command = this.commands[stringUtils.classify(commandName)] ||
      lookupCommand(this.commands, commandName);

    return new Command({
      ui: this.ui,
      project: this.project,
      commands: this.commands,
      tasks: this.tasks
    });
  }
});