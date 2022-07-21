import '../manifest';
import './neuralyzer.css';
import { OPTION_KEYS } from '../constants';

chrome.storage.sync.get(OPTION_KEYS, function ({ url }) {
  const dot = document.createElement('i');
  dot.id = 'neuralyzerBtn';
  dot.onclick = clickerOf({
    count: 10,
    timeout: 1000,
    action: function () {
      location.href = url;
    },
  }).onClick;
  document.body.appendChild(dot);
});

/**@param {{count: number, timeout: number, action: function}} config
 * @returns {{onClick: onClick}} */
function clickerOf(config) {
  let count = 0;
  let jobId;
  function onClick() {
    count++;
    if (jobId) {
      clearTimeout(jobId);
    }
    if (count === config.count) {
      reset();
      config.action();
    } else {
      jobId = setTimeout(reset, config.timeout);
    }
  }
  function reset() {
    count = 0;
    jobId = null;
  }
  return { onClick };
}
