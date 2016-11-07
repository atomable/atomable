module.exports = {
  name: 'atomable',

  includedCommands: function () {
    return {
      'cache': require('../commands/cache'),
      'deploy': require('../commands/deploy'),
      'generate': require('../commands/generate'),
      'help': require('../commands/help'),
      'list': require('../commands/list'),
      'remove': require('../commands/remove'),
    };
  }
};