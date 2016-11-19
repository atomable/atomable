'use strict';  // eslint-disable-line

const log = require('../utils/log')('atomable');
const Command = require('../ember-cli/lib/models/command');

const command = Command.extend({
  name: 'serve',

  description: 'Runs your atomable project locally.',

  aliases: ['s'],

  works: 'everywhere',

  run: (commandOptions, rawArgs) => {
    log.green('ok!');
    return 'ok';
  },
});

command.overrideCore = true;
module.exports = command;
