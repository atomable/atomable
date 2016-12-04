const fs = require('fs');
const yaml = require('js-yaml');

module.exports = (filePath) => {
  const rawConfig = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));

  const cleanPath = filePath.replace(/[^\\\/]*$/, ''); // eslint-disable-line
  const lastIndex = rawConfig.handler.lastIndexOf('.');
  if (lastIndex >= 0) {
    const fileName = rawConfig.handler.substring(0, lastIndex);
    const exportName = rawConfig.handler.substring(lastIndex + 1);

    rawConfig.handler = require(cleanPath + fileName)[exportName]; // eslint-disable-line
  } else {
    rawConfig.handler = require(cleanPath + rawConfig.handler); // eslint-disable-line
  }

  return rawConfig;
};
