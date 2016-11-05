const getBucketName = require('./get-bucket-name');
const emptyBucket = require('./empty-bucket');
const deleteStack = require('./delete-stack');

module.exports = (log, stackName, region) => {
  log.dim(`Deleting ${stackName} stack...`);

  getBucketName(log, stackName, region)
    .then(bucketName => emptyBucket(log, bucketName, region))
    .then(_ => deleteStack(log, stackName, region))
    .catch(log.red);
};