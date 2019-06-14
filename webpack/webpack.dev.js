const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const loadJs = require('./parts/load-js');
const loadCss = require('./parts/load-css');
const loadImages = require('./parts/load-images');
const loadFonts = require('./parts/load-fonts');
const loadMd = require('./parts/load-md');
const devServer = require('./parts/dev-server');
const sourceMap = require('./parts/source-map');

module.exports = merge([
  {
    mode: 'development',
    entry: {
      docs: './docs/index.js',
    },
    output: {
      path: path.resolve(__dirname, '../docs/dist'),
      publicPath: '/',
      filename: '[name].bundle.js',
      chunkFilename: 'async_[name].bundle.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        jimu: path.resolve(__dirname, '../src'),
        docs: path.resolve(__dirname, '../docs'),
      },
    },
    plugins: [
      new CleanWebpackPlugin('../es'),
      new HtmlWebpackPlugin({
        chunks: ['docs'],
        template: 'docs/index.tpl',
        filename: 'index.html',
        inject: true,
      }),
    ],
  },
  loadJs(),
  loadCss(),
  loadImages(),
  loadFonts(),
  loadMd(),
  devServer(),
  sourceMap({ type: 'inline-source-map' }),
]);
