var webpack = require("webpack");
var path = require('path');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
    debug: false,

    entry: {
        lib: [path.join(__dirname, 'client/entry.js')],

        //react related libraries: 225KB
        rl: [
            "react",
            "react-dom",
            "react-motion",
            "react-redux",
            "react-router",
            "react-router-redux",
            "redux",
            "redux-logger",
            "redux-thunk"
        ],

        "react-wui": ["react-wui"],

        //将第三方分开打包: 282KB
        vendor: [
            "es6-promise",
            "immutable",
            "is_js",
            "isomorphic-fetch",
            "whatwg-fetch",
            "moment"
        ],

        //chart related libraries: 596KB
        chart: [
            "react-echarts",
            "echarts"
        ]
    },

    output: {
        path: __dirname,
        filename: "build/[name].js"
    },

    plugins: [
        //第三方公共包依赖
        new webpack.optimize.CommonsChunkPlugin({
            names: ['rl', 'vendor', 'chart', 'react-wui'],
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
        //配置编译预处理器
        preLoaders: [
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/} //代码检查组件
        ],

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
            },
            {test: /\.css$/, loader: "style!css"},
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=10000&name=build/images/[name].[ext]'

            },
            {test: /\.scss$/, loader: "style!css!resolve-url!sass"},
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]'
            }
        ],

    },

    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx', '.scss'],

        alias: {
            'react-wui': path.join(__dirname, 'react-wui/'),
            images: path.join(__dirname, 'client/static_resources/images'),
            fontAwesome: path.join(__dirname, 'client/static_resources/styles/3rd/fa/scss/font-awesome.scss')
        }
    },

    eslint: {
        failOnWarning: false
    },

    devtool: false,

    devServer: {
        host: "localhost",
        port: 5800,
        historyApiFallback: true, // 当刷新当前页面会出现404错误，所以需要在web server上设置该参数。（History API）
        // hot: true,
        inline: true,
        progress: true,
        stats: {colors: true}
    }
};