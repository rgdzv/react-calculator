const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

let mode = 'development'

if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}

module.exports = {
    mode: mode,
    entry: {
        index: './src/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[contenthash].bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/react',
                            '@babel/preset-typescript',
                        ],
                    },
                },
            },
            {
                test: /\.(scss|css)$/,
                exclude: /node_modules/, 
                use: [
                    (mode === 'development') ? 'style-loader' :  MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator : {
                    filename : 'assets/images/[name][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator : {
                    filename : 'assets/fonts/[name][ext][query]'
                }
            },
        ],
    },
    devtool: 'source-map',
    devServer: {
        static: path.join(__dirname, 'build'),
        historyApiFallback: true,
        port: 3001,
        open: true,
        hot: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss'],
        plugins: [new TsconfigPathsPlugin()],
    },
    plugins: [
        new HTMLWebpackPlugin({ template: './src/index.html' }),
        new ForkTsCheckerWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        })
    ],
}