const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('./ManifestPlugin');

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
    entry: { neuralyzer: './src/contentScripts/neuralyzer.js' },
    output: {
      publicPath: '',
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/inline',
        },
      ],
    },
  });
};
