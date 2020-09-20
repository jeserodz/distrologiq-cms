const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const handler = require('serve-handler');

dotenv.config();

function getRuntimeConfig() {
  const configExamplePath = path.resolve(__dirname, '../env.example');
  const configExample = dotenv.parse(fs.readFileSync(configExamplePath));
  const config = {};

  for (const key in configExample) {
    config[key] = process.env[key];
  }

  return config;
}

const server = http.createServer((request, response) => {
  // Provide runtime configuration
  if (request.url === '/config.js') {
    return response.end(
      `window.env = ${JSON.stringify(getRuntimeConfig(), null, 2)}`
    );
  }

  // Serve static assets for single-page app
  return handler(request, response, {
    public: path.resolve(__dirname, '../build'),
    rewrites: [{ source: '*', destination: '/index.html' }],
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
