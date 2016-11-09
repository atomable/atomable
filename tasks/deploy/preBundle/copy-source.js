const ncp = require('ncp');
const mkdirParentSync = require('./mkdir-parent-sync');

module.exports = (source, destination) =>
  new Promise((resolve, reject) => {
    mkdirParentSync(destination, '0777');
    ncp(source, destination, {
      filter: name => !/node_modules|\.atomable/gm.test(name),
    }, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
