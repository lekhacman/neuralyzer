import './neuralyzer.css';
import { OPTION_KEYS } from '../constants';
import { createDot } from './dot';

chrome.storage.sync.get(OPTION_KEYS, function (options) {
  document.body.appendChild(createDot(options.url));
});
