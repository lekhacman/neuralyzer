const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('./ManifestPlugin');

const contentScripts = {
  neuralyzer: {
    path: './src/contentScripts/neuralyzer.js',
    seed: { matches: ['*://*/*'] },
  },
};

module.exports = function neuralyzerConfig(env) {
  const devConfig = merge(commonConfig.dev, {
    plugins: [new HtmlWebpackPlugin({ title: 'Neuralyzer' })],
    devServer: {
      port: 6501,
    },
  });
  const prodConfig = merge(commonConfig.prod, {
    plugins: [new ManifestPlugin('manifest.json')],
  });

  return merge(env.WEBPACK_SERVE ? devConfig : prodConfig, {
    name: 'neuralyzerConfig',
    entry: Object.entries(contentScripts).reduce(function (
      scripts,
      [key, { path }]
    ) {
      scripts[key] = path;
      return scripts;
    },
    {}),
    output: {
      publicPath: '',
    },
  });
};
