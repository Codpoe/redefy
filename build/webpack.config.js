const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: path.resolve(__dirname),
    mode: 'development',
    entry: {
        // sview: './src/sview.js',
        index: './demo/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name]/[name].bundle.js'
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
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]/[name].bundle.css'
        })
    ],
    devServer: {
        hot: true,
        historyApiFallback: true
    },
    devtool: 'source-map'
};
