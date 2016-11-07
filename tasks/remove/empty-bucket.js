const aws = require('aws-sdk');
const Maybe = require('liftjs').Maybe;

module.exports = (log, bucketName) => {
  return new Promise((resolve, reject) => {
    if (Maybe(bucketName)
      .map(bucketName => {
        const s3 = new aws.S3();

        listObjects(s3, [], { Bucket: bucketName }, objects => {
          if (objects.length > 0) {
            s3.deleteObjects({
              Bucket: bucketName,
              Delete: {
                Objects: objects.map(o => { return { Key: o.Key }; })
              }
            }, function (err, data) {
              resolve();
            });
          } else {
            resolve();
          }
        });
      }).isNothing()) {
      resolve();
    }
  });
};

const listObjects = (s3, objects, params, callback) => {
  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      callback([]);
    }
    //TODO continuation token
    const combined = objects.concat(data.Contents);
    if (data.KeyCount > 999) {
      listObjects(s3, combined, params, callback);
    } else {
      callback(combined)
    }
  });
};