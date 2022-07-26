function capitalize(str) {
  return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;
}
module.exports = { capitalize };
