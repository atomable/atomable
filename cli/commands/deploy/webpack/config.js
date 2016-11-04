const path = require('path');

const webpack = require(path.join(__dirname, '..', '..', '..', '..', 'node_modules/webpack'));

module.exports = (sourceDir, outDir) => {
  const eslint_loader = path.join(__dirname, '..', '..', '..', '..', 'node_modules/eslint-loader');
  const source_map_loader = path.join(__dirname, '..', '..', '..', '..', 'node_modules/source-map-loader');
  const babel_loader = path.join(__dirname, '..', '..', '..', '..', 'node_modules/babel-loader');

  return {
    entry: [`${sourceDir}/node_modules/babel-polyfill/lib/index.js` , `${sourceDir}/handler.js`],
    output: {
      path: outDir,
      filename: 'handler.js',
      libraryTarget: 'commonjs2',
    },
    target: 'node',
    module: {
      preLoaders: [
         { test: /^.+\.(map|week-map)$/, loader: eslint_loader, exclude: /node_modules/ },
        { test: /^.+\.(map|week-map)$/, loader: source_map_loader, exclude: /node_modules/ }
      ],
      loaders: [{
        test: /^.+\.(jsx?|esx?)$/,
        exclude: '/(node_modules|bower_components|\.map)/',
        loader: babel_loader,
        query: {
          presets: [
            'latest',
            'stage-0'
          ]
        }
      }]
    },
    plugins: [
      new webpack.IgnorePlugin(/^.+\.(map|week-map)$/)
    ],
    devtool: 'source-map'
  };
};