'use strict';

const fs = require('fs');
const path = require('path');
const uuid = require('node-uuid');
const yaml = require('js-yaml');
const chalk = require('chalk');

const Maybe = require('liftjs').Maybe;

const walker = require('./walker');
const name = require('./project-name');

const serverless = require('serverless');

/**
 * () deploys the project to the stage
 */
module.exports = (log, stage, tmp, bundle, region) => {
  return new Promise((resolve, reject) => {
    walker(tmp)
      .then(files => {
        const serverlessConfig = {
          service: name(),
          provider: {
            name: 'aws',
            runtime: 'nodejs4.3',
            stage: stage,
            region: region,
            cfLogs: true
          },
          functions: files
            .filter(f => /atomable.yml/g.test(f))
            .map(f => yaml.load(fs.readFileSync(f)))
            .map(conf => {
              const functions = {};
              functions[conf.name] = {
                handler: 'handler.handler',
                events: [
                  {
                    http: {
                      path: conf.https.path,
                      method: conf.https.method
                    }
                  }
                ]
              };
              return functions;
            }).reduce((a, b) => Object.assign(a, b), {})
        };
        fs.writeFileSync(bundle + `/serverless.yml`, yaml.dump(serverlessConfig));
      }).then(() =>
        new Promise((resolve, reject) => {
          serverless(bundle, { region, stage }, 'deploy', log.dim)
            .then(resolve)
            .catch(console.log);
        }));
  });
};
