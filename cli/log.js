const chalk = require('chalk');

const atomablize = (message) =>
    `atomable: ${message}`;

module.exports.cyan = (...args) =>
    console.log(chalk.cyan(atomablize(args)));

module.exports.red = (...args) =>
    console.log(chalk.red(atomablize(args)));

module.exports.green = (...args) =>
    console.log(chalk.green(atomablize(args)));

module.exports.dim = (...args) =>
    console.log(chalk.dim(atomablize(args)));

module.exports.yellow = (...args) =>
    console.log(chalk.yellow(atomablize(args)));