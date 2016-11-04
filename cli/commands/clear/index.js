const clear = require('./clear');

/**
 * () clears the .atomable cache
 */
module.exports = (log, stage) => {
  log.dim(`Clearing atomable cache...`);

  const cache = `${process.cwd()}/.atomable/`;
  clear(cache);

  log.dim(`Cache cleared...`);
};
