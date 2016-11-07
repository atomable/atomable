const chalk = require('chalk');

const buildMessage =
  (prefix) =>
    (message) => !prefix
      ? message
      : `${prefix}: ${message}`;

const writeOut =
  (message) =>
    (chalk) =>
      console.log(chalk(message));

const log =
  (prefix) => {
    return {
      cyan: (message) => writeOut(buildMessage(prefix)(message))(chalk.cyan),
      red: (message) => writeOut(buildMessage(prefix)(message))(chalk.red),
      green: (message) => writeOut(buildMessage(prefix)(message))(chalk.green),
      dim: (message) => writeOut(buildMessage(prefix)(message))(chalk.dim),
      yellow: (message) => writeOut(buildMessage(prefix)(message))(chalk.yellow),
      blue: (message) => writeOut(buildMessage(prefix)(message))(chalk.blue),
      reset: log
    };
  };

module.exports = log;