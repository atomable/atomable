const aws = require('aws-sdk');
const Maybe = require('liftjs').Maybe;

module.exports = (log, region) => {
  return new Promise((resolve, reject) => {
    var cf = new aws.CloudFormation({ region: region });
    cf.listStacks({}, function (error, data) {
      if (error) {
        reject(error);
      }
      data.StackSummaries
        .filter(s => s.StackStatus != 'DELETE_COMPLETE')
        .map(s => { return { name: s.StackName, status: s.StackStatus }; })
        .map(s => `${s.name}  ${s.status}`)
        .map(log.cyan);
    });
  });
};