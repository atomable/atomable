'use strict';

const program = require('commander');

// Load local package
const pkg = require('load-pkg');
const generate = require(__dirname + '/commands/generate');
const publish = require(__dirname + '/commands/publish');


console.log("       __                 __   __   ");
console.log(" ___ _/ /____  __ _ ___ _/ /  / /__ ");
console.log("/ _ `/ __/ _ \\/  ' / _ `/ _ \\/ / -_)");
console.log("\\_,_/\\__/\\___/_/_/_\\_,_/_.__/_/\\__/ ");
console.log("  Severless Microservice Framework");
console.log("  atomable.io, v1.0.0");
console.log("                                    ");

program
  .version(pkg.version)
  .usage('<command> [options]');

program.name = 'atomable';

// generate command
program
  .command('generate <name>')
  .alias('g')
  .action(name =>
    generate(name));

// publish
program
  .command('publish')
  .alias('p')
  .option('-e, --env [env]', 'env to use for config, default [dev]', 'dev')
  .action(options =>
    publish(options.env));

program.parse(process.argv);

// infinite stack traces
Error.stackTraceLimit = Infinity;

if (!program.args.length) {
  program.help();
}