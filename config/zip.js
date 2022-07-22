const { spawn } = require('child_process');
const { name, version } = require('../package.json');
const pluginName = `${name}-${version}.zip`;

spawn('zip', ['-jrv', pluginName, 'dist']).stdout.pipe(process.stdout);
console.log(`Exporting ${pluginName}`);
