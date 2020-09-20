const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const config = dotenv.config();

const template = `
// Auto-generated Development Configuration
window.env = ${JSON.stringify(config.parsed, null, 2)};
`;

fs.writeFileSync(path.resolve(__dirname, '../public/env.js'), template);

console.log('Updated public/env.js');
