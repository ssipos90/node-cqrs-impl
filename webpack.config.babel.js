import path from 'path';
import webpack from 'webpack';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';

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

export default {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: path.join(__dirname, "src", "index.js")
    },
    resolve: {
        modules: [path.resolve(__dirname, 'js'), 'node_modules'],
        extensions: ['*', '.js'],
        alias: {
            Scripts: path.resolve(__dirname, 'src/'),
        }
    },
    devtool: env === 'dev' ? 'eval-source-map' : 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins,
    output: {
        path: distPath,
        filename: "js/[name].js",
        chunkFilename: "js/chunk.[name].js"
    }
};
