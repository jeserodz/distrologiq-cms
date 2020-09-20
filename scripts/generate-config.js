const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envFilePath = path.resolve(__dirname, '../.env');
const outputFilePath = path.resolve(__dirname, '../public/env.js');

function generate() {
  const config = dotenv.config({ path: envFilePath });

  const template =
    `// Auto-generated Development Configuration\n` +
    `window.env = ${JSON.stringify(config.parsed, null, 2)};\n`;

  fs.writeFileSync(outputFilePath, template);

  console.log('Updated public/env.js');
}

generate();

if (process.argv.includes('--watch')) {
  console.log('Watching for changes in the .env file...');

  fs.watchFile(envFilePath, () => {
    console.log('Detected changed in the .env file');
    generate();
  });
}
