const exec = require('child_process').exec;

module.exports = tmp => new Promise((resolve, reject) => {
  exec('npm install --production', {
    cwd: tmp,
  }, (error, stdout, stderr) => {
    if (error) {
      reject(stderr);
    }
    resolve();
  });
});

