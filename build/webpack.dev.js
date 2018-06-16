const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        site: './site/index.js'
    },
    output: {
        path: path.join(__dirname, 'site/dist'),
        publicPath: '/site/dist/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: ['babel-loader', '@mdx-js/loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                })
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
        new HtmlWebpackPlugin({
            title: 'x-view',
            template: 'site/index.tpl',
            filename: 'index.html',
            inject: true
        }),
        new ExtractTextPlugin({
            filename: '[name].bundle.css'
        })
    ],
    devServer: {
        port: 8008,
        historyApiFallback: {
            rewrites: [
                { from: /./, to: '/site/dist/index.html' }
            ]
        }
    },
    devtool: 'source-map'
};
