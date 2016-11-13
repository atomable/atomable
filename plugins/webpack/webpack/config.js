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
    plugins,
  };
};
