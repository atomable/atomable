const fs = require('fs');
const path = require('path');

const findConfigFiles = (dir, filelist) => {
  filelist = filelist || []; // eslint-disable-line

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      findConfigFiles(path.join(dir, file), filelist);
    } else if (file === 'atomable.yml') {
      filelist.push(path.join(dir, file));
    }
  });

  return filelist;
};

module.exports = findConfigFiles;
