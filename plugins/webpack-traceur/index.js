const webpack = require('./webpack');
const preBundle = require('./pre-bundle');

module.exports =
  (log, projectName, stage, source, tmp, bundle, minify) =>
    preBundle(log, stage, source, tmp)
      .then(() =>
        webpack(log, tmp.replace(/\\+/g, '/'), bundle.replace(/\\+/g, '/'), minify));
