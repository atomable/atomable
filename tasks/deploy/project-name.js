module.exports = () => {
  try {
    return require('./package.json').name;  // eslint-disable-line
  } catch (err) {
    return process.cwd().split(/[\\/]/g).pop();
  }
};
