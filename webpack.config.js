
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: "production",
    // mode: 'development',

    entry: {
        ejc: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
        cli: ['@babel/polyfill', path.resolve(__dirname, 'src/cli.js')],
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.js']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['@babel/preset-env'],
                        plugins: [
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }]
            }
        ]
    },

    target: 'node',

    optimization: {
        minimize: false
    }

}