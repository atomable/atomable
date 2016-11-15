const config = require('./config');
const webpack = require('webpack');

/**
 * () compiles files
 */
module.exports = (log, source, destination, minify) => {
  log.dim('Bundling...');

  return new Promise((resolve, reject) => {
    const webpackConfig = config(webpack, source, destination, minify);

    webpack(webpackConfig, (err, stats) => {
      if (stats.hasWarnings()) {
        log.reset('webpack').yellow(stats.toJson().warnings.toString().replace(/\.\/\.atomable\/[^/]+\/tmp\//g, ''));
      }
      if (stats.hasErrors()) {
        reject(`\nWebpack failed:\n${stats.toJson().errors.toString().replace(/\.\/\.atomable\/[^/]+\/tmp\//g, '')}`);
      }
      resolve();
    });
  });
};
