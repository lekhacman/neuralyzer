const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function optionsPage(env) {
  const devConfig = merge(commonConfig.dev, {
    devServer: {
      port: 6500,
    },
  });

  return merge(env.WEBPACK_SERVE ? devConfig : commonConfig.prod, {
    name: 'optionsPage',
    entry: { options: './src/options/options.js' },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/options/options.html' }),
    ],
  });
};
