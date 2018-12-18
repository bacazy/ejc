
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: "production",
    // mode: 'development',

    entry: {
        ejc: [path.resolve(__dirname, 'src/index.js')]
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
                        plugins: [
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }]
            }
        ]
    },

    target: 'node'
}