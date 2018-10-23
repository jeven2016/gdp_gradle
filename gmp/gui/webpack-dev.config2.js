var webpack = require("webpack");
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
    progress: true,
    entry: {
        lib: [
            'webpack/hot/dev-server',
            'webpack/hot/only-dev-server',
            path.join(__dirname, 'client/entry.js')],
        // path.join(__dirname,  'test/redux/index.js')],
        
        //将第三方分开打包
        vendor: [
            'antd',
            'lodash',
            'react',
            'react-dom',
            'react-grid-layout',
            'react-motion',
            'react-redux',
            'react-router',
            'react-router-redux',
            'react-tap-event-plugin',
            'redux',
            'redux-thunk',
            'whatwg-fetch'
        ]
    },

    output: {
        path: __dirname,
        filename: "build/[name].js"
    },

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
                    // compact: true,
                    presets: ['react', 'es2015']
                }
            },


            {test: /\.css$/, loader: "style!css"}, //会将CSS文件红的样式定义动态插入到页面的head部分
            {test: /\.scss$/, loader: "style!css!resolve-url!sass"},

            {
                /*图片资源在加载时先压缩，然后当内容size小于~10KB时，会自动转成base64的方式内嵌进去，
                 这样可以减少一个HTTP的请求。当图片大于10KB时，则会在img/下生成压缩后的图片，命名是[hash:8].[name].[ext]的形式。
                 hash:8的意思是取图片内容hashsum值的前8位，这样做能够保证引用的是图片资源的最新修改版本，保证浏览器端能够即时更新*/
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=10000&name=build/images/[name].[ext]'

            },
            {test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url'}
        ],

        plugins: [
            // Enables Hot Modules Replacement热部署
            new webpack.HotModuleReplacementPlugin(),

            // Allows error warnings but does not stop compiling.
            new webpack.NoErrorsPlugin(),

            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),

            //第三方依赖
            new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),

            //enable devTools in development environment
            new webpack.DefinePlugin({
                __DEV__: JSON.stringify(JSON.parse('true'))
            })
        ]
    },

    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx', '.scss'],

        alias: {
            images: path.join(__dirname, 'static_resources/images'),

            //widgets directory
            FontIcon: path.join(__dirname, 'client/widgets/common/FontIcon'),
            Drawer: path.join(__dirname, 'client/widgets/common/Drawer')
        }
    },

    eslint: {
        failOnWarning: false
    },

    //在浏览器中直接调试我们的源码，在控制台的sources下，点开可以看到webpack://目录
    devtool: 'cheap-module-eval-source-map',


    devServer: {
        host: "localhost",
        port: 4000,
        historyApiFallback: true, // 当刷新当前页面会出现404错误，所以需要在web server上设置该参数。（History API）
        hot: true,
        inline: true,
        progress: true,
        stats: {colors: true}
    }


};