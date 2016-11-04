const fs = require('fs');

const deleteFolderRecursive = (dir) => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir)
      .forEach((file) => {
        const current = `${dir}/${file}`;
        fs.statSync(current).isDirectory()
          ? deleteFolderRecursive(current)
          : fs.unlinkSync(current);
      });
    fs.rmdirSync(dir);
  }
};

module.exports = deleteFolderRecursive;