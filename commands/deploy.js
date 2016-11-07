const uuid = require('node-uuid');
const Command = require('ember-cli/lib/models/command');

const log = require('../utils/log')('atomable');

const preBundle = require('../tasks/deploy/preBundle');
const webpack = require('../tasks/deploy/webpack');
const serverlessDeploy = require('../tasks/deploy/serverless');

const command = Command.extend({
  name: 'deploy',

  aliases: ['d'],

  works: 'insideProject',

  availableOptions: [
    { name: 'stage', type: String, aliases: ['s'], default: 'dev' },
    { name: 'region', type: String, aliases: ['r'], default: 'us-east-1' },
    { name: 'minify', type: Boolean, aliases: ['m'], default: true }
  ],

  run: function (commandOptions, rawArgs) {
    const source = `${process.cwd()}/`;
    const destination = `${source}/.atomable/deploy-${uuid.v1()}/`;
    const tmp = `${destination}/tmp/`;
    const bundle = `${destination}/bundle/`;

    return preBundle(log, commandOptions.stage, source, tmp)
      .then(() => webpack(log, tmp, bundle, commandOptions.minify))
      .then(() => serverlessDeploy(log, commandOptions.stage, tmp, bundle, commandOptions.region))
      .then(() =>
        log.green(`Successfully deployed.`))
      .catch(err => {
        log.red('There was a problem deploying the package.\n\n' + err);
      });
  }
});

command.overrideCore = true;
module.exports = command