'use strict';

const uuid = require('node-uuid');
const Command = require('ember-cli/lib/models/command');

const log = require('../utils/log')('atomable');

const getEndpoints = require('../tasks/deploy/get-endpoints');
const name = require('../tasks/deploy/project-name');

const command = Command.extend({
  name: 'endpoints',

  aliases: ['e'],

  works: 'insideProject',

  availableOptions: [
    { name: 'stage', type: String, aliases: ['s'], default: 'dev' },
    { name: 'region', type: String, aliases: ['r'], default: 'us-east-1' }
  ],

  run: function (commandOptions, rawArgs) {

    return getEndpoints(log, name() + '-' + commandOptions.stage, commandOptions.region)
      .then(log.dim)
      .catch(log.red);
  }
});

command.overrideCore = true;
module.exports = command