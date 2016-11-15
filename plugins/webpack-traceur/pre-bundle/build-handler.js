const fs = require('fs');
const path = require('path');
const walker = require('./walker');
const yaml = require('js-yaml');

/**
 * () copies source files recursively to destination omiting js and es
 */
module.exports = (source, tmp) =>
  new Promise(resolve =>
    walker(source)
      .then((files) => {
        const imports = files
          .filter(f => /atomable.yml/g.test(f))
          .map(f => ({
            confile: f,
            conf: yaml.load(fs.readFileSync(f)),
          })).map(c => ({
            conf: c.conf,
            handler: {
              path: path.join(path.dirname(c.confile), c.conf.handler.substr(0, c.conf.handler.lastIndexOf('.'))),
              func: c.conf.handler.substr(c.conf.handler.lastIndexOf('.')),
            },
          })).map(c =>
            fs.readFileSync(path.join(__dirname, 'templates/register.js'), 'utf8')
              .replace(/\/\*\* func \*\//g, `require('../../../${c.handler.path.replace(/\\/g, '/')}.js')${c.handler.func}`)
              .replace(/\/\*\* conf \*\//g, JSON.stringify(c.conf)))
          .join('');

        fs.writeFileSync(`${tmp}/handler.js`, fs.readFileSync(path.join(__dirname, 'templates/handler.js'), 'utf8')
          .replace(/\/\*\* imports \*\//g, imports));
        resolve();
      }));
