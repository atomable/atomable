'use strict';

const fs = require('fs');

const writeFile = (file, contents) => {
  fs.writeFileSync(file, contents, 'UTF-8', { flags: 'w+' });
};

const readFile = (file) => {
  return fs.readFileSync(file, "utf8");
};

const mkdir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdir(dir);
  }
};

/**
 * Generate Command.
 */
module.exports = (name) => {
  console.log(`atomable: Generating ${name} microservice...`);

  const destination = process.cwd() + `/${name}`;
  mkdir(destination);

  writeFile(`${destination}/${name}.js`, readFile(`${__dirname}/template/beretta.js`).replace(/beretta/g, name));
  writeFile(`${destination}/${name}.spec.js`, readFile(`${__dirname}/template/beretta.spec.js`).replace(/beretta/g, name));
  writeFile(`${destination}/atomable.yml`, readFile(`${__dirname}/template/atomable.yml`).replace(/beretta/g, name));

  mkdir(`${destination}/env`);
  writeFile(`${destination}/env/conf.yml`, readFile(`${__dirname}/template/env/conf.yml`));
  writeFile(`${destination}/env/conf-dev.yml`, readFile(`${__dirname}/template/env/conf.yml`));
  writeFile(`${destination}/env/conf-prod.yml`, readFile(`${__dirname}/template/env/conf.yml`).replace(/dev/g, `prod`));

  console.log(`atomable: Successfully generated ${name} microservice in "${destination}".`);
};
