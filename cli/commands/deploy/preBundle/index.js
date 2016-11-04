const copy = require('./copy-source');
const babel = require('./install-dependencies');
const npm = require('./npm-install');
const buildhandler = require('./build-handler');

const log = (message) =>
  console.log(`atomable: ${message}`);

/**
 * () copies source files recursively to destination omiting js and es
 */
module.exports = (stage, source, destination) => {

  const tmp = `${destination}/tmp`;

  return copy(source, tmp)
    .then(() => babel(tmp))
    .then(() => npm(tmp))
    .then(() => buildhandler(tmp))
};