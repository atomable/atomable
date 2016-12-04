const findConfigFiles = require('./find-config-files');
const extractConfig = require('./extract-config');
const mergeConfigs = require('./merge-configs');

module.exports = (basePath) => {
  basePath = basePath || process.cwd(); // eslint-disable-line

  return mergeConfigs(findConfigFiles(basePath).map(extractConfig));
};
