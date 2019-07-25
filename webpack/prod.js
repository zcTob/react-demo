const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
const path = require('path')

module.exports = (env) => {
    const config = merge(common(env), {
        mode: 'production',
        devtool: 'source-map',
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        output: {
            path: path.resolve(__dirname, '../build'),
            publicPath: '/public',
            chunkFilename: 'js/[name][chunkhash].chunk.js',
            filename: 'js/[name][contenthash].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.html'),
                filename: path.resolve(__dirname, '../build/index.html')
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'css/[name].css',
                chunkFilename: 'css/[name].[chunkhash].css'
            })
        ]
    })

    if (env.analyzer) {
        config.plugins.push(new BundleAnalyzerPlugin())
    }
    return config
}
