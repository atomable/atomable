module.exports = (webpack, sourceDir, outDir, minify) => {
  const plugins = [
    new webpack.IgnorePlugin(/^.+\.(map|week-map)$/),
    new webpack.optimize.DedupePlugin(),
  ];
  if (minify) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }));
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
        exclude: /node_modules/,
        loader: 'traceur-loader',
        query: {
          experimental: true,
          runtime: true,
        },
      }],
    },
    plugins,
  };
};
