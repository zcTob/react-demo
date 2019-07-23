const webpack = require('webpack')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const resolve = (url) => path.resolve(__dirname, url)
module.exports = (env) => {
    const devMode = env.NODE_ENV === 'dev'
    return {
        target: 'web',
        entry: {
            index: resolve('../src2/index.tsx')
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.json'],
            alias: {
                views: resolve('../src2/views'),
                utils: resolve('../src2/utils'),
                components: resolve('../src2/components'),
                config: resolve('../src2/config'),
                styles: resolve('../src2/styles'),
                http: resolve('../src2/http')
            }
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    include: resolve('../src2'),
                    enforce: 'pre',
                    use: [
                        {
                            loader: 'eslint-loader',
                            options: {
                                emitError: true
                            }
                        }
                    ]
                },
                {
                    test: /\.tsx?$/,
                    include: resolve('../src2'),
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
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
                {
                    test: /\.(png|jpeg|jpg|gif)$/,
                    include: resolve('../src2'),
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                name: '[hash].[ext]',
                                outputPath: 'images'
                            }
                        }
                    ]
                },
                {
                    test: /\.svg$/,
                    include: resolve('../src2'),
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
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
