const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
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
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            import: false
                        }
                    },
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
                loader: ['babel-loader', '@codpoe/react-markdown-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'x-view',
            template: 'site/index.tpl',
            filename: 'index.html',
            inject: true
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
