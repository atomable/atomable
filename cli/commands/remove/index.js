const getBucketName = require('./get-bucket-name');
const emptyBucket = require('./empty-bucket');
const deletestack = require('./delete-stack');

module.exports = (log, stackName, region) => {
    log.dim(`Deleting stack ${stackName}`);

    getBucketName(log, stackName, region)
        .then((bucketName) => emptyBucket(log, bucketName, region))
        .then(() => deleteStack(log, stackName, region))
        .catch(log.red);
};