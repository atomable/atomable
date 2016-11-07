const fs = require('fs');
const path = require('path');

module.exports = mkdirParentSync = (dir, mode) => {
  if (!fs.existsSync(dir)) {
    const parent = path.dirname(dir);
    if (!fs.existsSync(parent)) {
      mkdirParentSync(parent, mode);
    }
    fs.mkdirSync(dir, mode);
  }
};
