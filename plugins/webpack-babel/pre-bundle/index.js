const fs = require('fs');
const installDependecies = require('./install-dependencies');
const npmInstall = require('./npm-install');
const buildHandler = require('./build-handler');
const mkdirParentSync = require('./mkdir-parent-sync');

module.exports = (log, stage, source, tmp) => {
  log.dim('Installing dependencies...');

  mkdirParentSync(tmp, '0777');

  const packageFile = `${tmp}/package.json`;
  if (!fs.existsSync(packageFile)) {
    fs.writeFileSync(packageFile, '{}', 'utf8');
  }

  return npmInstall(tmp)
    .then(() => installDependecies(tmp))
    .then(() => buildHandler(source, tmp));
};
