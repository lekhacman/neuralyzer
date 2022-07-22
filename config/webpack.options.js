const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = function optionsPage(env) {
  const devConfig = merge(commonConfig.dev, {
    devServer: {
      port: 6500,
    },
  });
  const prodConfig = merge(commonConfig.prod, {
    plugins: [
      new WebpackManifestPlugin({
        generate: function (_, files) {
          return {
            action: {
              default_popup: files.filter((f) => f.name.endsWith('.html'))[0]
                .name,
            },
          };
        },
      }),
    ],
  });

  return merge(env.WEBPACK_SERVE ? devConfig : prodConfig, {
    name: 'optionsPage',
    entry: { options: './src/options/options.js' },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/options/options.html' }),
    ],
  });
};
