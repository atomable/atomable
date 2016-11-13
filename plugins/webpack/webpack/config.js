module.exports = (webpack, sourceDir, outDir, minify) => {
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
        { test: /^.+\.(map|week-map)$/, loader: 'eslint-loader', exclude: /node_modules/ },
        { test: /^.+\.(map|week-map)$/, loader: 'source-map-loader', exclude: /node_modules/ },
      ],
      loaders: [{
        test: /^.+\.(jsx?|esx?)$/,
        exclude: '/(node_modules|bower_components|.map)/',
        loader: 'babel-loader',
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
