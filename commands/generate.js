'use strict';  // eslint-disable-line
const fs = require('fs');
const log = require('../utils/log')('atomable');
const Command = require('../ember-cli/lib/models/command');
const SilentError = require('silent-error');

const command = Command.extend({
  name: 'generate',

  description: 'Generates a new microservice example with a configured https endpoint with the provided name.',

  aliases: ['g'],

  works: 'insideProject',

  availableOptions: [
    { name: 'directory', type: String, aliases: ['dir'] },
    { name: 'template', type: String, aliases: ['t'], default: '' },
  ],
  anonymousOptions: [
    '<name>',
  ],

  run: (commandOptions, rawArgs) => {
    let name = rawArgs.shift();

    if (!name) {
      return Promise.reject(new SilentError(`The 'atomable ${this.name}' command requires a name argument to be specified. For more details, use 'atomable help'.`));
    }

    name = name.toLowerCase();

    log.dim(`Generating ${name} microservice...`);

    const writeFile = (file, contents) => {
      fs.writeFileSync(file, contents, 'UTF-8', { flags: 'w+' });
    };

    const mkdir = (dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdir(dir);
      }
    };

    const templatePath = `../tasks/generate/templates${commandOptions.template !== '' ? `-${commandOptions.template}` : ''}`;

    const destination = `${process.cwd()}/${commandOptions.directory || name}`;

    mkdir(destination);
    writeFile(`${destination}/${name}.js`, (require(templatePath + '/beretta')).replace(/beretta/g, name)); // eslint-disable-line
    writeFile(`${destination}/${name}.spec.js`, (require(templatePath + '/beretta.spec.js')).replace(/beretta/g, name)); // eslint-disable-line
    writeFile(`${destination}/atomable.yml`, (require(templatePath + '/atomable')).replace(/beretta/g, name)); // eslint-disable-line

    mkdir(`${destination}/env`);
    writeFile(`${destination}/env/conf.yml`, require(`${templatePath}/conf`)); // eslint-disable-line
    writeFile(`${destination}/env/conf-dev.yml`, require(`${templatePath}/conf`)); // eslint-disable-line
    writeFile(`${destination}/env/conf-prod.yml`, (require(templatePath + '/conf')).replace(/dev/g, 'prod')); // eslint-disable-line

    log.dim(`Successfully generated ${name} microservice in '${destination}'.`);

    return Promise.resolve();
  },
});

command.overrideCore = true;
module.exports = command;
