module.exports = function (content) {
  const packageJson = this._module.resourceResolveData.descriptionFileData;
  const manifest = JSON.parse(content);
  manifest.name = `${packageJson.name
    .substring(0, 1)
    .toUpperCase()}${packageJson.name.substring(1)}`;
  manifest.description = packageJson.description;
  manifest.version = packageJson.version;
  this.emitFile('manifest.json', JSON.stringify(manifest), {});
  return '';
};
