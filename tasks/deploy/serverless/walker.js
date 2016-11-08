'use strict';

const fs = require('fs');
const path = require('path');

module.exports = (dir) => {
  const many = [];

  return new Promise((resolv, reject) => {
    const walkSync = (d) => {
      if (/node_modules/g.test(d)) {
        return;
      }

      const files = fs.readdirSync(d)
      files.forEach(function (file) {
        const p = `${d}/${file}`;
        if (fs.statSync(p).isDirectory()) {
          walkSync(p);
        }
        else {
          many.push(path.relative(dir, p));
        }
      });
    };
    walkSync(dir);
    resolv(many);
  });
};