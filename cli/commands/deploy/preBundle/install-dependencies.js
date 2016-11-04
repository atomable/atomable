const exec = require('child_process').exec;

/**
 * () copies source files recursively to destination omiting js and es
 */
module.exports = (tmp) => {
  return new Promise((resolve, reject) => {
    exec('yarn add --dev babel-preset-latest babel-preset-stage-0 babel-plugin-transform-runtime https://github.com/atomable/runtime', {
      cwd: tmp
    }, (error, stdout, stderr) => {
      if (error) {
        reject(err);
      }
      resolve();
    });
  });
};