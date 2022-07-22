require('dotenv').config();
const optionsPage = require('./config/webpack.options');
const contentScripts = require('./config/webpack.contentScripts');
module.exports = [optionsPage, contentScripts];
