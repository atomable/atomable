const Command = require('ember-cli/lib/models/command');


const log = require('../utils/log')('atomable');

const clear = require('../tasks/cache/clean');

module.exports = Command.extend({
  name: 'cache',
  description: `Cleans the '.atomable' cache.`,
  aliases: ['c'],
  works: 'insideProject',

  availableOptions: [
    { name: 'clean', type: Boolean, default: false, aliases: ['c'] }
  ],

  run: function (commandOptions, rawArgs) {
    if (commandOptions.clean) {
      log.dim(`Clearing atomable cache...`);

      const cache = `${process.cwd()}/.atomable/`;
      clear(cache);

      log.dim(`Cache cleared...`);
    }
    else {
      log.dim(`Nothing to do. Did you want to clean the cache? (atomable cache --clean)`);
    }
    return Promise.resolve();
  }
});
