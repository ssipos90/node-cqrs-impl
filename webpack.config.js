const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const distPath = path.resolve(__dirname, 'dist');

const env = process.env.NODE_ENV === undefined ? 'dev' : process.env.NODE_ENV;

const plugins = [
    new FriendlyErrorsWebpackPlugin({clearConsole: true}),
    new WebpackNotifierPlugin({
        title: 'Watcher',
        alwaysNotify: process.argv.indexOf('--env.always-notify') > -1
    }),
    new webpack.NamedModulesPlugin()
];

const externals = fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .reduce((accumulator, mod) => ({
        [mod]: 'commonjs ' + mod
    }), {});

export default {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: path.join(__dirname, "src", "index.js")
    },
    externals,
    resolve: {
        modules: [path.resolve(__dirname, 'js'), 'node_modules'],
        extensions: ['*', '.js'],
        alias: {
            Scripts: path.resolve(__dirname, 'src/'),
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    target: 'node',
    plugins,
    output: {
        path: distPath,
        filename: "js/[name].js",
        chunkFilename: "js/chunk.[name].js"
    }
};
