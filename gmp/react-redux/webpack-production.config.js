var webpack = require("webpack");
var path = require('path');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
        lib: [path.join(__dirname, 'client/entry.js')],

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
                    compact: true,
                    presets: ['react', 'es2015']
                }
            },
            {test: /\.css$/, loader: "style!css"},
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=10000&name=build/images/[name].[ext]'

            },
            {test: /\.scss$/, loader: "style!css!resolve-url!sass"},
            {test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url'}
        ],

        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                sourceMap: false,
                mangle: false
            }),

            // Allows error warnings but does not stop compiling.
            new webpack.NoErrorsPlugin(),

            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),

            //第三方依赖
            new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),

            new webpack.DefinePlugin({
                DEBUG: false,
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
        ]
    },

    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx', '.scss'],

        alias: {
            images: path.join(__dirname, 'static_resources/images')
        }
    },

    eslint: {
        failOnWarning: false
    }

};