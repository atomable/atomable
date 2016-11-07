const preBundle = require('./preBundle');
const webpack = require('./webpack');
const serverlessDeploy = require('./serverless');
const uuid = require('node-uuid');

/**
 * () deploys the project to the stage
 */
module.exports = (log, stage, region, minify) => {
  log.dim(`Packaging ${stage}...`);

  const source = `${process.cwd()}/`;
  const destination = `${source}/.atomable/deploy-${uuid.v1()}/`;
  const tmp = `${destination}/tmp/`;
  const bundle = `${destination}/bundle/`;

  preBundle(log, stage, source, tmp)
    .then(() => webpack(log, tmp, bundle, minify))
    .then(() => serverlessDeploy(log, stage, tmp, bundle, region))
    .then(() =>
      log.green(`Successfully deployed.`))
    .catch(err => {
      log.red('There was a problem deploying the package.\n\n' + err);
    });
};
