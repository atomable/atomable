const http = require('http');
const runtime = require('atomable-runtime');
const queryString = require('querystring');
const buildConfig = require('./config/build-config');

const requestHandler = (request, response, log) => {
  const path = request.url.match('^[^?]*')[0];
  const method = request.method;
  const query = queryString.parse(request.url.substring(request.url.indexOf('?') + 1));

  const body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    // clear require cache
    Object.keys(require.cache).forEach((key) => { delete require.cache[key]; });
    const configs = buildConfig();

    if (configs.length === 0) {
      log.red('No atomable.yml files found.');
      response.statusCode = 404; // eslint-disable-line
      response.end(); // eslint-disable-line
      return;
    }

    runtime.clear();
    configs.forEach(config => runtime.register(config.handler, config));

    runtime.handle({
      path,
      httpMethod: method,
      queryStringParameters: query,
      body: body.length > 0 ? JSON.parse(Buffer.concat(body).toString()) : { },
      headers: request.headers,
    }, null, (err, runtimeResp) => {
      response.statusCode = runtimeResp.statusCode; // eslint-disable-line
      response.setHeader('Content-Type', 'application/json'); // eslint-disable-line
      response.end(JSON.stringify(runtimeResp.body)); // eslint-disable-line
    });
  });
};

module.exports = (log, port) =>
  new Promise((fulfill, reject) => {
    try {
      const server = http.createServer((request, response) =>
        requestHandler(request, response, log));

      server.listen(port, () => {
        log.dim(`Running on port ${port}`);
      });
    } catch (err) {
      reject(err);
    }
  });
