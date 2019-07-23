const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./common.js')
const path = require('path')
module.exports = (env) =>
    merge(common(env), {
        mode: 'development',
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            port: '3000',
            hot: true,
            inline: true,
            overlay: true,
            proxy: {},
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            historyApiFallback: {
                index: '/index.html'
            }
        },
        plugins: [new webpack.HotModuleReplacementPlugin()],
        output: {
            path: path.resolve(__dirname, 'build'),
            // filename: 'js/dev.js',
            publicPath: '/'
        }
    })
