const program = require('commander');
const chalk = require('chalk');

const log = require('./log');
const generate = require(__dirname + '/commands/generate');
const deploy = require(__dirname + '/commands/deploy');
const clear = require(__dirname + '/commands/clear');

console.log(chalk.blue("                                    "));
console.log(chalk.blue("       __                 __   __   "));
console.log(chalk.blue(" ___ _/ /____  __ _ ___ _/ /  / /__ "));
console.log(chalk.blue("/ _ `/ __/ _ \\/  ' / _ `/ _ \\/ / -_)"));
console.log(chalk.blue("\\_,_/\\__/\\___/_/_/_\\_,_/_.__/_/\\__/ "));
console.log(chalk.blue("  Severless Microservice Framework"));
console.log(chalk.blue("  atomable.io, v1.0.0-beta"));
console.log(chalk.blue("                                    "));

program
  .usage('<command> [options]');

program.name = 'atomable';

// generate
program
  .command('generate <name>')
  .alias('g')
  .action(name =>
    generate(log, name));

// deploy
program
  .command('deploy')
  .alias('d')
  .option('-s, --stage [stage]', 'stage to use for config, default [dev]', 'dev')
  .action(options =>
    deploy(log, options.stage));

// clear
program
  .command('clear')
  .action(() => clear(log));

program.parse(process.argv);

// infinite stack traces
Error.stackTraceLimit = Infinity;

if (!program.args.length) {
  program.help();
}