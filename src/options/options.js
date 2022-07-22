import './options.css';
import { OPTION_KEYS } from '../constants';
chrome.storage.sync.get(OPTION_KEYS, function (config) {
  OPTION_KEYS.forEach(
    (key) => (document.getElementById(key).value = config[key] || '')
  );
});

document.getElementById('configuration').onsubmit = function (event) {
  event.preventDefault();
  const values = Object.values(event.target).reduce(function (
    acc,
    { name, value }
  ) {
    if (name) {
      acc[name] = value;
    }
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
