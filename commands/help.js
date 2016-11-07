/*
The MIT License

Copyright (c) 2016 Google, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

const fs = require('fs');
const path = require('path');

const Command = require('ember-cli/lib/models/command');
const stringUtils = require('ember-cli-string-utils');
const lookupCommand = require('ember-cli/lib/cli/lookup-command');

const commandsToIgnore = [
  ''
];

const command = Command.extend({
  name: 'help',
  description: 'Outputs the usage instructions for all commands or the provided command',
  aliases: [undefined, 'h', '--help', '-h'],

  availableOptions: [],

  run: function (commandOptions, rawArgs) {
    let commandFiles = fs.readdirSync(__dirname)
      // Remove files that are not JavaScript or Typescript
      .filter(file => file.match(/\.(j|t)s$/) && !file.match(/\.d.ts$/))
      .map(file => path.parse(file).name)
      .map(file => file.toLowerCase());

    commandFiles = commandFiles.filter(file => {
      return commandsToIgnore.indexOf(file) < 0;
    });

    let commandMap = commandFiles.reduce((acc, curr) => {
      let classifiedName = stringUtils.classify(curr);
      let defaultImport = require(`./${curr}`);

      acc[classifiedName] = defaultImport;

      return acc;
    }, {});

    commandFiles.forEach(cmd => {
      let Command = lookupCommand(commandMap, cmd);

      let command = new Command({
        ui: this.ui,
        project: this.project,
        commands: this.commands,
        tasks: this.tasks
      });

      if (rawArgs.length > 0) {
        if (cmd === rawArgs[0]) {
          this.ui.writeLine(command.printDetailedHelp(commandOptions));
        }
      } else {
        this.ui.writeLine(command.printBasicHelp(commandOptions));
      }

    });
  }
});

command.overrideCore = true;
module.exports = command;