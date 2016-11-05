const aws = require('aws-sdk');

module.exports = (log, bucketName) => {

  return new Promise((resolve, reject) => {


    var s3 = new AWS.S3();

    const list = [];
    var params = {
      Bucket: bucketName
    };

    s3.listObjectsV2(params, function (err, data) {
      if (err) console.log(err, err.stack);






    });

      resolve();
  });
};