const webpack = require('webpack')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const resolve = (url) => path.resolve(__dirname, url)

module.exports = (env) => {
    const devMode = env.NODE_ENV === 'dev'
    return {
        target: 'web',
        entry: {
            index: resolve('../src/index')
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.json'],
            alias: {
                views: resolve('../src/views'),
                utils: resolve('../src/utils'),
                components: resolve('../src/components'),
                config: resolve('../src/config'),
                styles: resolve('../src/styles'),
                http: resolve('../src/http')
            }
        },
        module: {
            rules: [
                {
                    test: /\.[tj]sx?$/,
                    include: resolve('../src'),
                    enforce: 'pre',
                    use: [
                        {
                            loader: 'eslint-loader',
                            options: {
                                emitError: true,
                                emitWarning: true,
                                quiet: false, //忽略警告
                                fix: false,
                                cache: false
                            }
                        }
                    ]
                },
                {
                    test: /\.[tj]sx?$/,
                    include: resolve('../src'),
                    use: [
                        { loader: 'babel-loader' },
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                },
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    mode: 'global',
                                    localIdentName: '[local]--[hash:base64:5]'
                                },
                                localsConvention: 'camelCaseOnly',
                                importLoaders: 2
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
                {
                    test: /\.(png|jpeg|jpg|gif|svg)$/,
                    include: resolve('../src'),
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                                name: '[hash].[ext]',
                                outputPath: 'images'
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    loader: 'url-loader',
                    query: {
                        limit: 100,
                        outputPath: 'fonts'
                    }
                }
            ]
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                async: false
            }),
            new CleanWebpackPlugin(),
            new webpack.HashedModuleIdsPlugin()
        ]
    }
}
