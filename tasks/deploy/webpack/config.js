const path = require('path');

module.exports = (webpack, sourceDir, outDir, minify) => {
  const eslintLoader = path.join(__dirname, '..', '..', '..', 'node_modules/eslint-loader');
  const sourceMapLoader = path.join(__dirname, '..', '..', '..', 'node_modules/source-map-loader');
  const babelLoader = path.join(__dirname, '..', '..', '..', 'node_modules/babel-loader');

  const plugins = [
    new webpack.IgnorePlugin(/^.+\.(map|week-map)$/),
    new webpack.optimize.DedupePlugin(),
  ];
  if (minify) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  return {
    entry: [`${sourceDir}/handler.js`],
    output: {
      path: outDir,
      filename: 'handler.js',
      libraryTarget: 'commonjs2',
    },
    target: 'node',
    module: {
      preLoaders: [
        { test: /^.+\.(map|week-map)$/, loader: eslintLoader, exclude: /node_modules/ },
        { test: /^.+\.(map|week-map)$/, loader: sourceMapLoader, exclude: /node_modules/ },
      ],
      loaders: [{
        test: /^.+\.(jsx?|esx?)$/,
        exclude: '/(node_modules|bower_components|.map)/',
        loader: babelLoader,
        query: {
          presets: [
            'latest',
            'stage-0',
          ],
          plugins: [
            ['transform-runtime', {
              helpers: false,
              polyfill: false,
              regenerator: true,
            }],
          ],
        },
      }],
    },
    plugins,
  };
};
