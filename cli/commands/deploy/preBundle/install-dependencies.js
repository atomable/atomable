const exec = require('child_process').exec;

const log = (message) =>
  console.log(`atomable: ${message}`);

/**
 * () copies source files recursively to destination omiting js and es
 */
module.exports = (tmp) => {
  log(`Installing dependencies...`);

  return new Promise((resolve, reject) => {
    const s = Date.now();
    exec('yarn add --dev babel-preset-latest babel-preset-stage-0 https://github.com/atomable/runtime', {
      cwd: tmp
    }, (error, stdout, stderr) => {
      if (error) {
        reject(err);
      }
      const e = Date.now();
      log(e - s);
      resolve();
    });
  });
};