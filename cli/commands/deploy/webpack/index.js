const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const config = require('./config');

const webpack = require(path.join(__dirname, '..', '..', '..', '..', 'node_modules/webpack'));

const log = (message) =>
  console.log(`atomable: ${message}`);

/**
 * () compiles files
 */
module.exports = (source, destination) => {
  log(`Webpack...`);

  return new Promise((resolve, reject) => {
    const webpackConfigPath = `${source}/webpack-config.js`;
    const webpackConfig = config(source, destination);

    webpack(webpackConfig, (err, stats) => {
      if (stats.hasWarnings()) {
        log(stats.toJson().warnings)
      }
      if (stats.hasErrors()) {
        reject('\nWebpack failed:\n' + stats.toJson().errors)
      }
      log('Webpack done.');
      resolve()
    });
  });
};