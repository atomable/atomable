const path = require('path');
const config = require('./config');

const webpack = require(path.join(__dirname, '..', '..', '..', '..', 'node_modules/webpack'));

/**
 * () compiles files
 */
module.exports = (log, source, destination, minify) => {
  log.dim(`Webpack...`);

  return new Promise((resolve, reject) => {
    const webpackConfigPath = `${source}/webpack-config.js`;
    const webpackConfig = config(source, destination, minify);

    webpack(webpackConfig, (err, stats) => {
      if (stats.hasWarnings()) {
        log.yellow(stats.toJson().warnings.toString().replace(/\.\/\.atomable\/[^\/]+\/tmp\//g, ''))
      }
      if (stats.hasErrors()) {
        reject('\nWebpack failed:\n' + stats.toJson().errors.toString().replace(/\.\/\.atomable\/[^\/]+\/tmp\//g, ''))
      }
      resolve()
    });
  });
};