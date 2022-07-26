const { spawn } = require('child_process');
const bundle = `${process.env.npm_package_name}-${process.env.npm_package_version}.zip`;

spawn('zip', ['-jrv', bundle, 'dist']).stdout.pipe(process.stdout);
console.log(`::set-output name=bundle::${bundle}`);
console.log(`Exporting ${bundle}`);
