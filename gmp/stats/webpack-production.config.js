var webpack = require("webpack");
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
    debug: false,

    entry: {
        lib: [path.join(__dirname, 'client/entry.js')],

        //https://github.com/webpack/webpack/issues/300
        //important: a workaround is using array instead of a specific string to support diffent entries
        // MyModule: [path.join(__dirname, 'client/modules/MyModule.js')],

        //react related libraries
        rl: [
            "react",
            "react-dom",
            "react-motion",
            "react-redux",
            "react-router",
            "react-router-redux",
            "redux",
            "redux-logger",
            "redux-thunk",
            'react-intl'
        ],

        "react-wui": ["react-wui"],

        //将第三方分开打包: 282KB
        vendor: [
            "es6-promise",
            "immutable",
            "is_js",
            "isomorphic-fetch",
            "whatwg-fetch",
            "moment",
            "debug"
        ],

        //chart related libraries: 596KB
        chart: [
            "react-echarts",
            "echarts"
        ]
    },

    output: {
        path: path.join(__dirname, 'build'),
        filename: "[name].js",
        chunkFilename: "[name].js"
    },

    plugins: [
        //第三方公共包依赖
        new webpack.optimize.CommonsChunkPlugin({
            names: ['react-wui', 'chart', 'vendor', 'rl'],
            filename: '[name].js',
            minChunks: Infinity
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),

        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false
            }
        }),

        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),

        //生成html文件，并自动插入js依赖库
        new HtmlwebpackPlugin({
            title: 'Stats inquery system',
            template: path.join(__dirname, 'client/template.html'), //index.html及模板，编译完成后讲自动更新这个文件
            filename: 'index.html',//在root目录下生成一个html文件，用于production模式下启动dev server可以直接加载的首页
            chunks: ['rl', 'vendor', 'react-wui', 'chart', 'lib'],
            chunksSortMode: 'dependency',
            inject: 'body',
            hash: true,
            cache: true
        }),

        //js中import的css文件都将统一打包至次文件中
        new ExtractTextPlugin("style.css", {allChunks: true})
    ],

    module: {
        //配置编译预处理器
        preLoaders: [
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/} //代码检查组件
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
            // {test: /\.css$/, loader: "style!css"}, //会将CSS文件红的样式定义动态插入到页面的head部分
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css')},
            {
                /*图片资源在加载时先压缩，然后当内容size小于~10KB时，会自动转成base64的方式内嵌进去，
                 这样可以减少一个HTTP的请求。当图片大于10KB时，则会在img/下生成压缩后的图片，命名是[hash:8].[name].[ext]的形式。
                 hash:8的意思是取图片内容hashsum值的前8位，这样做能够保证引用的是图片资源的最新修改版本，保证浏览器端能够即时更新*/
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=10000&name=build/images/[name].[ext]'

            },
            {test: /\.scss$/, loader: "style!css!resolve-url!sass"},
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]'
            }
        ]
    },

    resolve: {
        // Allow to omit extensions when loading these files
        extensions: ['', '.js', '.jsx', '.scss'],

        alias: {
            'react-wui': path.join(__dirname, 'react-wui/'),
            images: path.join(__dirname, 'client/static_resources/images'),
        }
    },

    eslint: {
        failOnWarning: false
    },

    devtool: false,

    devServer: {
        host: "0.0.0.0",
        port: 5800,
        historyApiFallback: true, // 当刷新当前页面会出现404错误，所以需要在web server上设置该参数。（History API）
        // hot: true,
        inline: true,
        progress: true,
        stats: {colors: true}
    }
};