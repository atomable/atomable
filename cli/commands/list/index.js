const aws = require('aws-sdk');
const Maybe = require('liftjs').Maybe;

module.exports = (log, region) => {
  var cf = new aws.CloudFormation({ region: region });
  cf.listStacks({}, function (error, data) {
    if (error) {
      log.red(error);
    }
    data && data.StackSummaries && data.StackSummaries
      .filter(s => s.StackStatus != 'DELETE_COMPLETE')
      .map(s => { return { name: s.StackName, status: s.StackStatus }; })
      .map(s => `${s.name}  ${s.status}`)
      .map(log.cyan);
  });
};