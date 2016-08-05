/**
 * Created by jooskim on 8/4/16.
 */
const webpack = require('webpack');
const helpers = require('./helpers');

const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);

const METADATA = {
    title: "Angular 2 with Webpack Starter",
    baseUrl: "/"
};

module.exports = {
    metadata: METADATA,
    entry: {
        "vendor": "./src/vendor.ts",
        "main": "./src/main.ts"
    },
    resolve: {
        extensions: ["", ".ts", ".js", ".scss", ".css", ".json", ".html"],
        root: helpers.root("src"),
        moduleDirectories: ["node_modules"]
    },
    // externals: {
    //     "jquery": "jQuery",
    //     "$": "$"
    // },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    helpers.root('node_modules/rxjs'),
                    helpers.root('node_modules/@angular')
                ]

            }
        ],
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader!tslint'
                // exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style')
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [helpers.root('src/index.html')]
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            }
        ]
    },
    plugins: [],
    node: {
        global: "window",
        crypto: "empty",
        module: false,
        clearImmediate: false,
        setImmmediate: false
    }
}