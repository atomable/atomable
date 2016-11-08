'use strict';

const fs = require('fs');

const log = require('../utils/log')('atomable');

const Command = require('ember-cli/lib/models/command');
const SilentError = require('silent-error');


const command = Command.extend({
  name: 'generate',
  description: `Generates a sample microservice`,
  aliases: ['g'],
  works: 'insideProject',

  availableOptions: [
    { name: 'directory', type: String, aliases: ['dir'] }
  ],
  anonymousOptions: [
    '<name>'
  ],

  run: function (commandOptions, rawArgs) {
    let name = rawArgs.shift();

    if (!name) {
      return Promise.reject(new SilentError(`The 'atomable ${this.name}' command requires a name argument to be specified. For more details, use 'atomable help'.`));
    }

    name = name.toLowerCase();

    if (!commandOptions.directory) {
      commandOptions.directory = name;
    }

    log.dim(`Generating ${name} microservice...`);

    const writeFile = (file, contents) => {
      fs.writeFileSync(file, contents, 'UTF-8', { flags: 'w+' });
    };

    const mkdir = (dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdir(dir);
      }
    };

    const destination = process.cwd() + `/${commandOptions.directory}`;
    mkdir(destination);
    writeFile(`${destination}/${name}.js`, (require(`../tasks/generate/templates/beretta`)).replace(/beretta/g, name));
    writeFile(`${destination}/${name}.spec.js`, (require(`../tasks/generate/templates/beretta.spec.js`)).replace(/beretta/g, name));
    writeFile(`${destination}/atomable.yml`, (require(`../tasks/generate/templates/atomable`)).replace(/beretta/g, name));

    mkdir(`${destination}/env`);
    writeFile(`${destination}/env/conf.yml`, require(`../tasks/generate/templates/conf`));
    writeFile(`${destination}/env/conf-dev.yml`, require(`../tasks/generate/templates/conf`));
    writeFile(`${destination}/env/conf-prod.yml`, (require(`../tasks/generate/templates/conf`)).replace(/dev/g, `prod`));

    log.dim(`Successfully generated ${name} microservice in '${destination}'.`);
  }
});

command.overrideCore = true;
module.exports = command