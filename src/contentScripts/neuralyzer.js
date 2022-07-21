import '../manifest';
import './neuralyzer.css';
import { OPTION_KEYS } from '../constants';
import { createDot } from './dot';
import { subscribeStatus } from './status';

chrome.storage.sync.get(OPTION_KEYS, function (config) {
  document.body.appendChild(createDot(config.url));
  if (config.statusUrl) {
    subscribeStatus(config);
  }
});
