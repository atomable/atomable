'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const cp = require('child_process');
const os = require('os');
const archiver = require('archiver');
const request = require('request');

/**
 * A console writer that ouputs on the same line.
 */
const ConsoleWriter = function () {
  let self = this,
    writer = console,
    prepend = '\x1b[1F\x1b[2K',
    cMessage = '',
    cPrepend = '';
  self.write = function (message) {
    cMessage = message + '\t';
    writer.log(cPrepend + message);
    cPrepend = prepend;
  };
};



/**
 * Wrap the console writer.
 */
const getConsoleWriter = () => {
  let consoleWriter = new ConsoleWriter();
  return (message) => {
    consoleWriter.write(message);
    //console.log(message); // for debug
  };
};

/**
 * init the console writer
 */
const log = getConsoleWriter();

/**
 * Generate a random nomber because it not part of no api, fuck this.
 */
const randomInt = function (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
};

/**
 * Copy file fs shortcut.
 */
const copy = (filename, destfilename) => {
  fs.createReadStream(filename).pipe(fs.createWriteStream(destfilename));
};

/**
 * Delete dir recursively.
 */
const deleteFolderRecursive = (path) => {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      let curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

/**
 * Copy recusively.
 */
const copyRecursiveSync = (src, dest) => {
  let exists = fs.existsSync(src);
  let stats = exists && fs.statSync(src);
  let isDirectory = exists && stats.isDirectory();
  if (exists && isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.linkSync(src, dest);
  }
};

/**
 * Copy all relevant files to tmp and configure project.
 */
const copyFilesToTempDir = (source, env) => {
  const pkg = require(process.cwd() + '/package.json');
  const version = `${pkg.version}.${randomInt(100000, 10000)}`;
  const tmpDir = `${os.tmpdir()}/${pkg.name}-${version}/`;

  const actualEnvPath = `${tmpDir}/config/environment.js`;

  // mkdir dest
  fs.mkdirSync(tmpDir);

  // Setup environment
  fs.mkdirSync(`${tmpDir}/config`);
  copy(`${source}/config/environment.${env}.js`, actualEnvPath);

  // copy project files
  const files = fs.readdirSync(source);

  for (let file of files) {
    if (file.indexOf('config') !== 0 && file.indexOf('node_modules') !== 0) {
      copyRecursiveSync(source + file, tmpDir + file);
    }
  }


  return new Promise((resolve, reject) => {
    resolve(tmpDir);
  });
};

/**
 * Exec npm Install production
 */
const npmInstall = (dest) => {
  return new Promise((resolve, reject) => {
    log(`npm install --production`);

    cp.exec(`cd ${dest} && npm install --production`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Npm install failed.`);
        console.error(error);
        reject(new Error(`Npm install failed.`, error));
      }
      resolve(dest);
    });
  });
};

/**
 * Zip the files for upload.
 */
const zipIt = (tmpdir) => {
  log('Zipping package.');

  const zipFile = `${tmpdir.replace(/\/$/, '')}.zip`;
  const archive = archiver.create('zip', {});
  const zipStream = fs.createWriteStream(zipFile);
  return new Promise((resolve, reject) => {
    zipStream.on('close', () => {
      log('Zipping completed ');
      resolve(zipFile);
    });

    archive.pipe(zipStream);

    archive.bulk([{
      expand: true,
      src: ['**/*'],
      dot: true,
      cwd: tmpdir
    }]);

    archive.on('error', function (e) {
      console.log(e);
      reject(e);
    });

    archive.finalize();
  });
};

/**
 * getPreSignedUrl
 */
const getUpload = () => {
  // log('get upload');
  return new Promise((resolve, reject) => {
    https.get('https://api.atomable.io/upload', (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        resolve(JSON.parse(chunk));
      });
      res.on('error', (e) => {
        reject(e);
      });
    });
  });
};

/**
 * getPreSignedUrl
 */
const putZip = (zipFile, deployment) => {
  log('Uploading package');
  let uploadUrl = deployment.uploadUrl;

  return new Promise((resolve, reject) => {
    var stats = fs.statSync(zipFile);
    fs.createReadStream(zipFile).pipe(request({
      method: 'PUT',
      url: uploadUrl,
      headers: {
        'Content-Length': stats.size
      }
    }, (err, res, body) => {
      if (err) {
        reject(err);
      }
      resolve(deployment);
    }));
  });
};

/**
 * Upload zip
 */
const upload = (zipFile) => {
  // log('upload zip');
  getUpload()
    .then((deployment) => putZip(zipFile, deployment))
    .then((deployment) => {
      log(`Package was successfully uploaded to atomable.io for deployment this can take a few minutes, please stand by.
${JSON.stringify({ url: deployment.url, name: deployment.name }, null, 2)}`);
      return;
    }).catch((err) => {
      log('Upload failed, please check your network.');
    });
};

/**
 * Publish Command.
 */
module.exports = (env) => {
  const source = `${process.cwd()}/`;

  log(`Publishing ${env}`);

  copyFilesToTempDir(source, env)
    .then(npmInstall)
    .then(zipIt)
    .then(upload)
    .catch(err => {
      log('There was a problem publishing the package.');
    });
};
