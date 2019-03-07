const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const loadJs = require('./parts/load-js');
const loadCss = require('./parts/load-css');
const loadImages = require('./parts/load-images');
const devServer = require('./parts/dev-server');

module.exports = merge([
  {
    mode: 'development',
    entry: {
      docs: './docs/index.js'
    },
    output: {
      path: path.resolve(__dirname, '../docs/dist'),
      publicPath: '/',
      filename: '[name].bundle.js',
      chunkFilename: 'async_[name].bundle.js'
    },
    resolve: {
      alias: {
        'xview': path.resolve(__dirname, '../src'),
        'docs': path.resolve(__dirname, '../docs')
      }
    },
    module: {
      rules: [
        {
          test: /\.(eot|svg|ttf|woff)$/,
          loader: 'file-loader',
        },
        {
          test: /\.md$/,
          use: [
            'babel-loader',
            '@codpoe/react-markdown-loader'
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin('../dist'),
      new HtmlWebpackPlugin({
        chunks: ['docs'],
        template: 'docs/index.tpl',
        filename: 'index.html',
        inject: true
      }),
    ],
    devtool: 'source-map',
  },
  loadJs(),
  loadCss(),
  loadImages(),
  devServer(),
]);
