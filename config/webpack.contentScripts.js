const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  WebpackManifestPlugin,
  getCompilerHooks,
} = require('webpack-manifest-plugin');
const packageJson = require('../package.json');

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
    dependencies: ['optionsPage'],
    plugins: [
      new MergeManifestPlugin(),
      new WebpackManifestPlugin({
        seed: {
          name: `${packageJson.name
            .substring(0, 1)
            .toUpperCase()}${packageJson.name.substring(1)}`,
          version: packageJson.version,
          description: packageJson.description,
          ...packageJson.manifest,
        },
        generate(seed, _, entries) {
          Object.entries(entries).forEach(function ([key, fileNames]) {
            seed.content_scripts.push(
              fileNames.reduce(
                function (obj, name) {
                  const [_, ext] = /\.(js|css)$/.exec(name);
                  obj[ext].push(name);
                  return obj;
                },
                { ...contentScripts[key].seed, js: [], css: [] }
              )
            );
          });
          return seed;
        },
        serialize: JSON.stringify,
      }),
    ],
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
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/inline',
        },
      ],
    },
    output: {
      publicPath: '',
    },
  });
};

function MergeManifestPlugin() {}
MergeManifestPlugin.prototype.apply = function (compiler) {
  const { beforeEmit } = getCompilerHooks(compiler);

  beforeEmit.tap('MergeManifestPlugin', (manifest) => {
    const optionsJson = require('../dist/manifest.json');
    return Object.assign(manifest, optionsJson);
  });
};
