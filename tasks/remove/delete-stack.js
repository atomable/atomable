const aws = require('aws-sdk');

module.exports = (log, stackName, region) =>
  new Promise((resolve, reject) => {
    new aws.CloudFormation({ region })
      .deleteStack({ StackName: stackName }, (err) => {
        if (err) {
          reject(`There was an issue trying to delete the stack, try again or delete it manually.\n${err}`);
        }
        log.green('Stack deletion in progess.');
        resolve();
      });
  });
