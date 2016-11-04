const path = require('path');

const AsyncAwaitPlugin = require(path.join(__dirname, '..', '..', '..', '..', 'node_modules/webpack-async-await'));
const webpack = require(path.join(__dirname, '..', '..', '..', '..', 'node_modules/webpack'));
const ignore = new webpack.IgnorePlugin(/.map/g);

module.exports = (sourceDir, outDir) => {
  const babel_loader = path.join(__dirname, '..', '..', '..', '..', 'node_modules/babel-loader');
  return {
    entry: `${sourceDir}/handler.js`,
    output: {
      path: outDir,
      filename: 'handler.js',
      libraryTarget: 'commonjs2',
    },
    target: 'node',
    module: {
      loaders: [{
        test: '/\.(js|jsx|es|esx)?$/',
        exclude: '/(node_modules|bower_components)/',
        loader: babel_loader,
        query: {
          presets: [
            'latest',
            'stage-0'
          ],
          plugins: [
            new AsyncAwaitPlugin()
          ]
        }
      }]
    },
    plugins: [
      ignore
    ],
    devtool: 'source-map'
  };
};