'use strict';  // eslint-disable-line

const fs = require('fs');
const yaml = require('js-yaml');
const walker = require('./walker');
const serverless = require('serverless');

module.exports = (log, projectName, stage, source, bundle, region) =>
  walker(source)
    .then((files) => {
      const serverlessConfig = {
        service: projectName,
        provider: {
          name: 'aws',
          runtime: 'nodejs4.3',
          stage,
          region,
          cfLogs: true,
        },
        functions: files
          .filter(f => /atomable.yml/g.test(f))
          .map(f => yaml.load(fs.readFileSync(f)))
          .map((conf) => {
            const functions = {};
            functions[conf.name] = {
              handler: 'handler.handler',
              events: [
                {
                  http: {
                    path: conf.https.path,
                    method: conf.https.method,
                  },
                },
              ],
            };
            return functions;
          }).reduce((a, b) => Object.assign(a, b), {}),
      };
      fs.writeFileSync(`${bundle}/serverless.yml`, yaml.dump(serverlessConfig));
    }).then(() =>
      serverless(bundle, { region, stage }, 'deploy', log.dim));
