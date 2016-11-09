'use strict';

const aws = require('aws-sdk');
const Maybe = require('liftjs').Maybe;

module.exports = (log, stackName, region) => {
  const low = stackName.toLowerCase();
  return new Promise((resolve, reject) => {
    const cf = new aws.CloudFormation({ region });
    cf.listStacks({}, (error, data) => {
      if (error) {
        reject(error);
      }

      Maybe(data.StackSummaries
        .filter(s => s.StackName.toLowerCase() === low)
        .map(s => s.StackName).pop())
        .map(name => cf.listStackResources({ StackName: name },
          (error, data) =>  // eslint-disable-line
            resolve(Maybe(data)
              .map(d => d.StackResourceSummaries)
              .map(srs =>
                srs.filter(r => r.ResourceType === 'AWS::S3::Bucket')
                  .map(r => r.PhysicalResourceId)
                  .pop()).get())));
    });
  });
};
