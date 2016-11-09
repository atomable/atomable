const aws = require('aws-sdk');
const Maybe = require('liftjs').Maybe;

module.exports = (log, stackName, region, print) => {
  const shouldPrint = print || true;
  return new Promise((resolve, reject) => {
    const cf = new aws.CloudFormation({ region });
    cf.describeStacks({ StackName: stackName }, (error, data) => {
      if (error) {
        reject(error);
      }

      const microservices = [];
      Maybe(data)
        .map(d => d.Stacks)
        .map(s => s.shift())
        .map(s => s.Outputs)
        .map(out =>
          Maybe(out.filter(i => i.OutputKey.match(/^ServiceEndpoint/))
            .shift())
            .map(o => o.OutputValue)
            .map(endpoint => out.filter(o => o.OutputKey.match(/LambdaFunctionArn$/))
              .forEach(o =>
                microservices
                  .push(`${endpoint}/${o.OutputValue
                    .substring(o.OutputValue
                      .lastIndexOf(stackName) + stackName.length + 1)}`))));

      if (shouldPrint) {
        const newLog = log.reset().dim;
        newLog('-----------------------------------------------');
        newLog('endpoints');
        newLog('');
        microservices.forEach(newLog);
        newLog('');
        newLog('-----------------------------------------------');
      }

      resolve(microservices);
    });
  });
};
