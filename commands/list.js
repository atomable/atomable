'use strict';

const aws = require('aws-sdk');

const Command = require('ember-cli/lib/models/command');

const log = require('../utils/log')('atomable');

const command = Command.extend({
  name: 'list',
  description: `Lists the CloudFormation stack that are not DELETE_COMPLETE`,
  aliases: ['l'],
  works: 'everywhere',

  availableOptions: [
    { name: 'region', type: String, aliases: ['r'], default: 'us-east-1' }
  ],

  run: function (commandOptions, rawArgs) {
    const deletedFilter = s => s.StackStatus != 'DELETE_COMPLETE';

    return new Promise((resolve, reject) => {
      var cf = new aws.CloudFormation({ region: commandOptions.region });
      cf.listStacks({}, function (error, data) {
        if (error && !/Cannot read property 'Contents' of null/.test(error)) {
          return reject(error);
        }
        if (!(data && data.StackSummaries)) {
          log.dim('no stack found');
          return resolve();
        };

        log.dim(`CloudFormation stacks (${data.StackSummaries.filter(deletedFilter).length})`);

        data.StackSummaries
          .filter(deletedFilter)
          .map(s => { return { name: s.StackName, status: s.StackStatus }; })
          .map(s => `${s.name}  ${s.status}`)
          .map(log.reset().cyan);
        resolve();
      });
    });
  }
});

command.overrideCore = true;
module.exports = command
