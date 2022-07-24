const { spawn } = require('child_process');
const pluginName = `${process.env.npm_package_name}-${process.env.npm_package_version}.zip`;

spawn('zip', ['-jrv', pluginName, 'dist']).stdout.pipe(process.stdout);
console.log(`Exporting ${pluginName}`);
