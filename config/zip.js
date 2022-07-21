const { spawn } = require('child_process');
const { name, version } = require('../package.json');
const pluginName = `${name}-${version}.zip`;
// zip
spawn('zip', ['-jr', pluginName, 'dist']);
console.log(`Exported ${pluginName}`);
