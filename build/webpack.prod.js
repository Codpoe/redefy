const path = require('path');
const devConfig = require('./webpack.dev.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

delete devConfig.devServer;

module.exports = Object.assign(devConfig, {
  mode: 'production',
  entry: {
    xview: './src/index.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'xview.[hash:8].js',
    library: 'xview',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
})
