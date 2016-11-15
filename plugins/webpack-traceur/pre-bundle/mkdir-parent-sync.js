const fs = require('fs');
const path = require('path');

const mkdirParentSync = (dir, mode) => {
  if (!fs.existsSync(dir)) {
    const parent = path.dirname(dir);
    if (!fs.existsSync(parent)) {
      mkdirParentSync(parent, mode);
    }
    fs.mkdirSync(dir, mode);
  }
};

module.exports = mkdirParentSync;
