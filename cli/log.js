const chalk = require('chalk');

const atomablize =
  (prefix) =>
    (message) =>
      `${prefix}: ${message}`;

const log =
  (message) =>
    (chalk) =>
      console.log(chalk(message));

module.exports =
  (prefix) => {
    return {
      cyan: (message) => log(atomablize(prefix)(message))(chalk.cyan),
      red: (message) => log(atomablize(prefix)(message))(chalk.red),
      green: (message) => log(atomablize(prefix)(message))(chalk.green),
      dim: (message) => log(atomablize(prefix)(message))(chalk.dim),
      yellow: (message) => log(atomablize(prefix)(message))(chalk.yellow),
      blue: (message) => log(atomablize(prefix)(message))(chalk.blue),
    };
  };

