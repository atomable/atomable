const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const config = require('./config');

const webpack = require(path.join(__dirname, '..', '..', '..', '..', 'node_modules/webpack'));

/**
 * () compiles files
 */
module.exports = (log, source, destination) => {
  log.dim(`Webpack...`);

  return new Promise((resolve, reject) => {
    const webpackConfigPath = `${source}/webpack-config.js`;
    const webpackConfig = config(source, destination);

    webpack(webpackConfig, (err, stats) => {
      if (stats.hasWarnings()) {
        log.yellow(stats.toJson().warnings)
      }
      if (stats.hasErrors()) {
        reject('\nWebpack failed:\n' + stats.toJson().errors)
      }
      log.dim('Webpack done.');
      resolve()
    });
  });
};