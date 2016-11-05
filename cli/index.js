const program = require('commander');
const chalk = require('chalk');

const log = require('./log');
const generate = require(__dirname + '/commands/generate');
const deploy = require(__dirname + '/commands/deploy');
const clear = require(__dirname + '/commands/clear');
const remove = require(__dirname + '/commands/remove');

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
    generate(log('atomable'), name));

// deploy
program
  .command('deploy')
  .alias('d')
  .option('-s, --stage [stage]', 'stage to use for config, default [dev]', 'dev')
  .option('-r, --region [region]', 'aws region, default [us-east-1]', 'us-east-1')
  .option('--skip-minify', 'skip minifying code, default [true]', true)
  .action(options =>
    deploy(log('atomable'), options.stage, options.region, options.minify));

// clear
program
  .command('clear')
  .action(() => clear(log('atomable')));

// remove
program
  .command('remove <stackName>')
  .option('-r, --region [region]', 'aws region, default [us-east-1]', 'us-east-1')
  .alias('r')
  .action((stackName, options) => remove(log('atomable'), stackName, options.region));

program.parse(process.argv);

// infinite stack traces
Error.stackTraceLimit = Infinity;

if (!program.args.length) {
  program.help();
}