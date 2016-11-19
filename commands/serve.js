'use strict';  // eslint-disable-line

const log = require('../utils/log')('atomable');
const Command = require('../ember-cli/lib/models/command');
const server = require('../tasks/serve/http-server');

const command = Command.extend({
  name: 'serve',

  description: 'Serves your atomable project locally.',

  aliases: ['s', 'watch', 'w'],

  works: 'everywhere',

  availableOptions: [
    { name: 'port', type: Number, default: 3000, aliases: ['p'] },
  ],

  run: commandOptions => server(log, commandOptions.port),
});

command.overrideCore = true;
module.exports = command;
