const program = require('commander');

const generate = require(__dirname + '/commands/generate/generate');
const deploy = require(__dirname + '/commands/deploy/deploy');

console.log("                                    ");
console.log("       __                 __   __   ");
console.log(" ___ _/ /____  __ _ ___ _/ /  / /__ ");
console.log("/ _ `/ __/ _ \\/  ' / _ `/ _ \\/ / -_)");
console.log("\\_,_/\\__/\\___/_/_/_\\_,_/_.__/_/\\__/ ");
console.log("  Severless Microservice Framework");
console.log("  atomable.io, v1.0.0-beta");
console.log("                                    ");

program
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
  .command('deploy')
  .alias('d')
  .option('-s, --stage [stage]', 'stage to use for config, default [dev]', 'dev')
  .action(options =>
    deploy(options.stage));

program.parse(process.argv);

// infinite stack traces
Error.stackTraceLimit = Infinity;

if (!program.args.length) {
  program.help();
}