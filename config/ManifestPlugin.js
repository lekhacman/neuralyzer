const { capitalize } = require('./utils');

function ManifestPlugin(path) {
  this.path = path;
}

ManifestPlugin.prototype.apply = function (compiler) {
  compiler.hooks.emit.tapPromise(
    'ManifestPlugin',
    emit.bind(this, compiler.webpack.sources)
  );
};

function emit({ RawSource }, compilation) {
  return new Promise((resolve) => {
    compilation.inputFileSystem.readFile(this.path, function (err, data) {
      const manifest = JSON.parse(data.toString());
      manifest.name = capitalize(process.env.npm_package_name);
      manifest.version = process.env.npm_package_version;
      manifest.description = process.env.npm_package_description;
      resolve(
        compilation.emitAsset(
          'manifest.json',
          new RawSource(JSON.stringify(manifest))
        )
      );
    });
  });
}
module.exports = ManifestPlugin;
