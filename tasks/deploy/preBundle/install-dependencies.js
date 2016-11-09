const exec = require('child_process').exec;

module.exports = tmp =>
  new Promise((resolve, reject) =>
    exec('npm install --dev babel-preset-latest babel-preset-stage-0 babel-plugin-transform-runtime atomable-runtime', {
      cwd: tmp,
    }, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      }
      resolve();
    }));
