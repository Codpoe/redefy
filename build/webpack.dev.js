const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    docs: './docs/index.js'
  },
  output: {
    path: path.join(__dirname, '../docs/dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: 'async_[name].bundle.js'
  },
  resolve: {
    alias: {
      'xview': path.join(__dirname, '../src'),
      'docs': path.join(__dirname, '../docs')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modles/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      },
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
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      chunks: ['docs'],
      template: 'docs/index.tpl',
      filename: 'index.html',
      inject: true
    }),
    new ProgressBarPlugin()
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8008,
    historyApiFallback: true
  },
  devtool: 'source-map'
};
