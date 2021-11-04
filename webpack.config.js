const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const TerserPlugin = require('terser-webpack-plugin');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
    entry: ['./src/js/App.js', './src/css/scss/main.scss'],
    output: {
        filename: 'bundle.min.js',
        path: path.resolve(__dirname, 'web/dist')
    },
    externals: {
        jquery: 'jQuery'
    },
    devtool: "source-map",
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true } },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true } }
                ]
            }, {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: "images/[name].[ext]",
                        limit: 20000
                    }
                }]
            },
            {
                test: /\.(ttf|eot|otf|woff|woff2|svg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css',
            path: path.resolve(__dirname, 'web/dist')
        }),

        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3000,
            proxy: "dig.lara"
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: { output: { comments: false } }
            }),
        ]
    }
};