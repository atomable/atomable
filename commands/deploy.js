'use strict';  // eslint-disable-line
const uuid = require('node-uuid');
const Command = require('../ember-cli/lib/models/command');
const log = require('../utils/log')('atomable');
const preBundle = require('../tasks/deploy/preBundle');
const webpack = require('../tasks/deploy/webpack');
const serverlessDeploy = require('../tasks/deploy/serverless');
const getEndpoints = require('../tasks/deploy/get-endpoints');
const name = require('../tasks/deploy/project-name');

const command = Command.extend({
  name: 'deploy',

  description: 'Deploys all the microservices that are in the current directory or child directory and created the https endpoint if configured.',

  aliases: ['d'],

  works: 'insideProject',

  availableOptions: [
    { name: 'stage', type: String, aliases: ['s'], default: 'dev' },
    { name: 'region', type: String, aliases: ['r'], default: 'us-east-1' },
    { name: 'minify', type: Boolean, aliases: ['m'], default: true },
    { name: 'dry', type: Boolean, aliases: ['d'], default: false },
  ],

  run: (commandOptions) => {
    const source = `${process.cwd()}/`;
    const destination = `${source}/.atomable/deploy-${uuid.v1()}/`;
    const tmp = `${destination}/tmp/`;
    const bundle = `${destination}/bundle/`;
    const stackName = `${name()}-${commandOptions.stage}`;

    return preBundle(log, commandOptions.stage, source, tmp)
      .then(() =>
        webpack(log, tmp, bundle, commandOptions.minify))
      .then(() => (!commandOptions.dry
        ? serverlessDeploy(log, commandOptions.stage, tmp, bundle, commandOptions.region)
        : log(`Deployment skipped. the bundle is here ${destination}`)))
      .then(() =>
        getEndpoints(log, stackName, commandOptions.region))
      .then(() =>
        log.green('Complete.'))
      .catch(log.red);
  },
});

command.overrideCore = true;
module.exports = command;
