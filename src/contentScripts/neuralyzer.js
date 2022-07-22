import './neuralyzer.css';
import { OPTION_KEYS } from '../constants';
import { createDot } from './dot';
import { subscribeStatus } from './status';

chrome.storage.sync.get(OPTION_KEYS, function (options) {
  document.body.appendChild(createDot(options.url));
  if (options.statusUrl) {
    subscribeStatus(options);
  }
});
