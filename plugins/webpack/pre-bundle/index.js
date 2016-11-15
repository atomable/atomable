'use strict';

const fs = require('fs');
const npmInstall = require('./npm-install');
const buildHandler = require('./build-handler');
const mkdirParentSync = require('./mkdir-parent-sync');

module.exports = (log, stage, source, tmp) => {
  log.dim('Installing dependencies...');

  mkdirParentSync(tmp, '0777');

  const packageFileSource = `${source}/package.json`;
  let packageContents = '{}';
  if (fs.existsSync(packageFileSource)) {
    packageContents = fs.readFileSync(packageFileSource, 'utf8');
  }

  const packageFile = `${tmp}/package.json`;
  if (!fs.existsSync(packageFile)) {
    fs.writeFileSync(packageFile, packageContents, 'utf8');
  }

  return npmInstall(tmp)
    .then(() => buildHandler(source, tmp));
};
