'use strict';  // eslint-disable-line
const uuid = require('node-uuid');
const Command = require('../ember-cli/lib/models/command');
const log = require('../utils/log')('atomable');
const serverlessDeploy = require('../tasks/deploy/serverless');
const getEndpoints = require('../tasks/deploy/get-endpoints');
const projectName = require('../tasks/deploy/project-name');
const resolve = require('resolve');

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
    const name = projectName();
    const stackName = `${name}-${commandOptions.stage}`;

    return new Promise((done, fail) => {
      resolve('../plugins/webpack-babel', { basedir: __dirname }, (err, res) => {
        if (err) {
          fail(err);
        }
        const plugin = require(res); // eslint-disable-line
        done(plugin(log, name, commandOptions.stage, source, tmp, bundle, commandOptions.minify));
      });
    })
      .then(() => (!commandOptions.dry
        ? serverlessDeploy(log, name, commandOptions.stage, source, bundle, commandOptions.region)
        : log.dim(`Deployment skipped. the bundle is here ${destination}`)))
      .then(() => (!commandOptions.dry && getEndpoints(log, stackName, commandOptions.region)))
      .then(() =>
        log.green('Complete.'))
      .catch(log.red);
  },
});

command.overrideCore = true;
module.exports = command;
