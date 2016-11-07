const copy = require('./copy-source');
const installDependecies = require('./install-dependencies');
const npmInstall = require('./npm-install');
const buildHandler = require('./build-handler');

/**
 * () copies source files recursively to destination omiting js and es
 */
module.exports = (log, stage, source, tmp) => {
  return copy(source, tmp)
    .then(() =>
          log.dim(`Installing dependencies...`))
    .then(() => npmInstall(tmp))
    .then(() => installDependecies(tmp))
    .then(() => buildHandler(tmp))
};