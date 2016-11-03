'use strict';

const program = require('commander');

// Load local package
const pkg = require('load-pkg');
const serve = require(__dirname + '/commands/serve');
const publish = require(__dirname + '/commands/publish');
const init = require(__dirname + '/commands/init/init');
const generateEndpoint = require(__dirname + '/commands/generate/generateEndpoint');
const generateParameter = require(__dirname + '/commands/generate/generateParameter');
const wizard = require(__dirname + '/commands/generate/wizard');

program
  .version(pkg.version)
  .usage('<command> [options]');

program.name = 'atomable';

// generate
program
  .command('generate')
  .alias('g')
  .option('-m, --name <name>')
  .option('-p, --url-path <urlPath>')
  .option('-m --http-method <httpMethod>')
  .option('-s --summary <summary>')
  .action(options =>
    generate(options.name, options.urlPath, options.httpMethod, options.summary));

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