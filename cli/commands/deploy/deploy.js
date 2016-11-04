'use strict';

const clear = require('./clear');
const pre = require('./preBundle/index');
const webpack = require('./webpack/index');
const serverlessDeploy = require('./serverless-deploy');
const uuid = require('node-uuid');

const log = (message) =>
  console.log(`atomable: ${message}`);

/**
 * () deploys the project to the stage
 */
module.exports = (stage) => {
  log(`Deploying ${stage}...`);

  const source = `${process.cwd()}/`;
  const destination = `${source}/.atomable/deploy-${uuid.v1()}/`;
  const tmp = `${destination}/tmp/`;
  const bundle = `${destination}/bundle/`;

  //  clear(destination);

  pre(stage, source, destination)
    .then(() => webpack(tmp, bundle))
    .then(serverlessDeploy)
    .then(() =>
      log(`Successfully deployed.`))
  // .catch(err => {
  //   log('There was a problem deploying the package.', err);
  // });
};
