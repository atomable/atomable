const aws = require('aws-sdk');
const Maybe = require('liftjs').Maybe;

module.exports = (log, bucketName) =>
  new Promise((resolve) => {
    if (Maybe(bucketName)
      .map((name) => {
        const s3 = new aws.S3();

        const listObjects = (proxy, objects, params, callback) => {
          proxy.listObjectsV2(params, (err, data) => {
            if (err) {
              callback([]);
            }
            // TODO continuation token
            const combined = objects.concat(data.Contents);
            if (data.KeyCount > 999) {
              listObjects(proxy, combined, params, callback);
            } else {
              callback(combined);
            }
          });
        };

        return listObjects(s3, [], { Bucket: name }, (objects) => {
          if (objects.length > 0) {
            s3.deleteObjects({
              Bucket: name,
              Delete: {
                Objects: objects.map(o => ({ Key: o.Key })),
              },
            }, () => {
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
