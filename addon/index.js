'use strict';  // eslint-disable-line

module.exports = {
  name: 'atomable',

  includedCommands: () => ({
    cache: require('../commands/cache'), // eslint-disable-line
    deploy: require('../commands/deploy'), // eslint-disable-line
    generate: require('../commands/generate'), // eslint-disable-line
    serve: require('../commands/serve'), // eslint-disable-line
    list: require('../commands/list'), // eslint-disable-line
    remove: require('../commands/remove'), // eslint-disable-line
    endpoints: require('../commands/endpoints'), // eslint-disable-line
  }),
};
