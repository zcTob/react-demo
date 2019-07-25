const path = require('path')

module.exports = {
    mode: 'production',
    target: 'node',
    entry: {
        app: path.join(__dirname, '../src/server-entry.ts')
    },
    output: {
        filename: 'server-entry.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
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
            }
        ]
    },
    plugins: []
}
