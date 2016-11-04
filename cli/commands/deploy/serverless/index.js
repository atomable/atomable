const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const uuid = require('node-uuid');
const yaml = require('js-yaml');

const Maybe = require('liftjs').Maybe;

const walker = require('./walker');
const name = require('./project-name');

/**
 * () deploys the project to the stage
 */
module.exports = (log, stage, tmp, bundle) => {
  log.dim(`Deploying ${stage}...`);
  return new Promise((resolve, reject) => {
    walker(tmp)
      .then(files => {
        const serverlessConfig = {
          service: name(),
          provider: {
            name: 'aws',
            runtime: 'nodejs4.3',
            stage: stage || 'dev',
            region: 'us-east-1',
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
      }).then(() => {
        exec('node ' + path.join(__dirname, '..', '..', '..', '..', 'node_modules/serverless/bin/serverless deploy'), {
          cwd: bundle
        }, (error, sderror, sdout) => {
          console.log(error, sderror, sdout);
          if (error) {
            reject(error + sderror);
          }
          resolve(sdout);
        });
      });
  });
};
