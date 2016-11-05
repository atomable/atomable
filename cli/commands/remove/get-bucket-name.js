const aws = require('aws-sdk');
const Maybe = require('liftjs').Maybe;

module.exports = (log, stackName, region) => {
  const low = stackName.toLowerCase();
  return new Promise((resolve, reject) => {
    var cf = new aws.CloudFormation({ region: region });
    cf.listStacks({}, function (error, data) {
      if (error) {
        reject(error);
      }
      Maybe(data.StackSummaries.filter(s => s.StackName.toLowerCase() === low).map(s => s.StackName).pop())
        .map(stackName =>
          cf.listStackResources({ StackName: stackName },
            (error, data) => {
              resolve(
                Maybe(data)
                  .map(d => d.StackResourceSummaries)
                  .map(srs =>
                    srs.filter(r => r.ResourceType === 'AWS::S3::Bucket')
                      .map(r => r.PhysicalResourceId)
                      .pop()
                  ).get())
            }));
    });
  });
};