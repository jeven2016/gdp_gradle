var webpack = require("webpack");
var path = require('path');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '/test/router/app.js')
    ],

    /*   entry: {
     bundle: "./test/router/app.js",
     vendor: ['react']
     },
     */

    output: {
        path: __dirname,
        filename: "build/lib.js"
    },

    module: {
        //配置编译预处理器
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel",
                exclude: [nodeModulesPath],
                query: {
                    compact: true,
                    presets: ['es2015']
                }
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {
                /*图片资源在加载时先压缩，然后当内容size小于~10KB时，会自动转成base64的方式内嵌进去，
                 这样可以减少一个HTTP的请求。当图片大于10KB时，则会在img/下生成压缩后的图片，命名是[hash:8].[name].[ext]的形式。
                 hash:8的意思是取图片内容hashsum值的前8位，这样做能够保证引用的是图片资源的最新修改版本，保证浏览器端能够即时更新*/
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    /* 对于小质量的图片资源，可以由 url-loader 实现将其进行统一打包，代码中 url-loader?limit=10000
                     的含义就是对于所有小于 8kb 的图片资源转换成base64 格式。这在一定程度上可以替代CSS Sprites方案，
                     用于减少对于小图片资源的HTTP请求数量*/
                    'url?limit=10000&name=img/[hash:8].[name].[ext]',
                    'image-webpack'
                ]
            },
            {test: /\.scss$/, loader: "style!css!sass"}
        ],

        plugins: [
            // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
            new ExtractTextPlugin("[name].css"),

            // Enables Hot Modules Replacement热部署
            new webpack.HotModuleReplacementPlugin(),

            // Allows error warnings but does not stop compiling.
            new webpack.NoErrorsPlugin(),

            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    },
    devtool: 'eval',
    devServer: {
        port: 3000,
        historyApiFallback: true, // 当刷新当前页面会出现404错误，所以需要在web server上设置该参数。（History API）
        hot: true,
        inline: true,
        progress: true,
        stats: {colors: true}
    }


};