require('dotenv').config();
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const createChrome = require('./config/chrome');

function optionsPage(env) {
  let plugins = [
    new HtmlWebpackPlugin({ template: './src/options/options.html' }),
  ];
  let mode;
  if (env.WEBPACK_SERVE) {
    mode = 'development';
    plugins = plugins.concat([
      new webpack.DefinePlugin({
        chrome: createChrome(),
      }),
    ]);
  } else {
    mode = 'production';
  }

  return {
    name: 'optionsPage',
    mode,
    entry: './src/options/options.js',
    output: {
      filename: 'options.js',
      // clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins,
    devtool: 'inline-source-map',
    devServer: {
      hot: true,
      open: { app: { name: process.env.BROWSER } },
      port: 6500,
    },
  };
}

function neuralyzerConfig(env) {
  let plugins = [];
  let mode;
  if (env.WEBPACK_SERVE) {
    mode = 'development';
    plugins = [
      new HtmlWebpackPlugin({ title: 'Neuralyzer' }),
      new webpack.DefinePlugin({
        chrome: createChrome(),
      }),
    ];
  } else {
    mode = 'production';
  }

  return {
    name: 'neuralyzerConfig',
    mode,
    entry: './src/contentScripts/neuralyzer.js',
    output: {
      filename: 'neuralyzer.js',
      publicPath: '',
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /manifest/,
          loader: './config/manifest-loader.js',
        },
      ],
    },
    plugins,
    devtool: 'inline-source-map',
    devServer: {
      hot: true,
      open: { app: { name: process.env.BROWSER } },
      port: 6501,
    },
  };
}

module.exports = [optionsPage, neuralyzerConfig];
