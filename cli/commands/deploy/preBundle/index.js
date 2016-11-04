const copy = require('./copy-source');
const babel = require('./install-dependencies');
const npm = require('./npm-install');
const buildhandler = require('./build-handler');

/**
 * () copies source files recursively to destination omiting js and es
 */
module.exports = (log, stage, source, tmp) => {
  return copy(source, tmp)
    .then(() =>
      log.dim(`Installing dependencies...`))
    .then(() => babel(tmp))
    .then(() => npm(tmp))
    .then(() => buildhandler(tmp))
};