const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
const path = require('path')
const resolve = (url) => path.resolve(__dirname, url)

module.exports = (env) => {
    const devMode = env.NODE_ENV === 'dev'
    const config = {
        mode: 'production',
        target: 'node',
        entry: {
            server: path.join(__dirname, '../src/server')
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
                                emitWarning: false,
                                quiet: devMode ? false : true, //忽略警告
                                fix: false,
                                cache: false
                            }
                        }
                    ]
                },
                {
                    test: /\.[tj]sx?$/,
                    include: resolve('../src'),
                    exclude: /node_modules/,
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
        output: {
            filename: '[name].js',
            path: path.join(__dirname, '../dist'),
            publicPath: '/',
            libraryTarget: 'commonjs2'
        },
        devtool: 'source-map',
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                async: false
            }),
            new webpack.HashedModuleIdsPlugin(),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'css/[name].css',
                chunkFilename: 'css/[name].[chunkhash].css'
            })
        ]
    }

    if (env.analyzer) {
        config.plugins.push(new BundleAnalyzerPlugin())
    }
    return config
}
