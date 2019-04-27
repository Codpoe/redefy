// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');
const merge = require('webpack-merge');
const loadJs = require('../webpack/parts/load-js');
const loadCss = require('../webpack/parts/load-css');

module.exports = merge([
  {
    plugins: [
      // your custom plugins
    ],
    module: {
      rules: [
        // add your custom rules.
      ],
    },
    resolve: {
      alias: {
        jimu: path.resolve(__dirname, '../src'),
      },
    },
  },
  loadJs(),
  loadCss(),
]);
