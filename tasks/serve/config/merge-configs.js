module.exports = configs =>
  configs.reduce((a, b) =>
    a.concat(b), []);
