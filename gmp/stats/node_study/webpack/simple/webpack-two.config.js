var webpack = require("webpack");
var path = require('path');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
    debug: false,

    entry: {
        app: [path.join(__dirname, 'C.js')],

        lib: [path.join(__dirname, 'lib.js')]

    },

    output: {
        path: __dirname,
        filename: "build/[name].js"
    },

    plugins: [
        //第三方公共包依赖
        new webpack.optimize.CommonsChunkPlugin({
            names: ['lib'],
            filename: 'build/[name].js',
            minChunks: Infinity
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),

        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false
            }
        }),

        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ],

    module: {
        presets: [
            "es2015",
            'stage-3'
        ],

        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel",
                exclude: [nodeModulesPath],
                query: {
                    compact: false,
                    presets: ['es2015', 'react', 'stage-3'], //enable stage-1 to support es7 syntax
                    plugins: [
                        'add-module-exports',
                        'transform-class-properties',
                        'transform-decorators-legacy',
                        'transform-object-assign',
                        'transform-function-bind',
                        'transform-runtime'
                    ]//the IE doesn't support Object.assign method and a error would encounter if no plugin transform the method.
                }
            }
        ],

    },

    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx']
    },

    eslint: {
        failOnWarning: false
    },

    devtool: false,
};