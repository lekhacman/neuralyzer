// if (!chrome.storage) {
//   chrome = { storage: { sync: { get: noop, set: noop } } };
// }
// function noop() {}
chrome.storage.sync.get(['url'], function (config) {
  document.getElementById('url').value = config.url || '';
});

document.getElementById('configuration').onsubmit = function (event) {
  event.preventDefault();
  const values = Object.values(event.target).reduce(function (
    acc,
    { name, value }
  ) {
    acc[name] = value;
    return acc;
  },
  {});
  chrome.storage.sync.set(values, function () {
    document.getElementById('flashMsg').innerText = 'Config saved!';
    setTimeout(function () {
      document.getElementById('flashMsg').innerText = '';
    }, 1500);
  });
};
