'use strict';

const aws = require('aws-sdk');

module.exports = (log, stackName, region) => {
  return new Promise((resolve, reject) => {
    new aws.CloudFormation({ region: region })
      .deleteStack({ StackName: stackName }, (err, data) => {
        if (err) {
          reject('There was an issue trying to delete your stack, please try again or delete it manually.\n' + err);
        }
        log.green('Stack deletion in progess.');
        resolve();
      });
  });
};