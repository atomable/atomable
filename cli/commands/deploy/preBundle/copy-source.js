const fs = require('fs');
const path = require('path');
const ncp = require('ncp');

const mkdirParentSync = (dir, mode) => {
  const parent = path.dirname(dir);
  if (!fs.existsSync(parent)) {
    mkdirParentSync(parent, mode);
  }
  fs.mkdirSync(dir, mode);
};

const log = (message) =>
  console.log(`atomable: ${message}`);

/**
 * () copies source files recursively to destination omiting js and es
 */
module.exports = (source, destination) => {
  return new Promise((resolve, reject) => {
    mkdirParentSync(destination, 0777);
    ncp(source, destination, {
      filter: (name) => !/node_modules|\.atomable/gm.test(name)
    }, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};