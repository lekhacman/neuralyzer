const webpack = require('webpack');
const createChrome = require('./chrome');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = {
  dev: {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [new webpack.DefinePlugin({ chrome: createChrome() })],
    devtool: 'inline-source-map',
    devServer: {
      hot: true,
      open: { app: { name: process.env.BROWSER } },
    },
  },
  prod: {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin()],
    optimization: { minimizer: ['...', new CssMinimizerPlugin()] },
  },
};
