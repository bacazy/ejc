
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: "production",
    // mode: 'development',

    entry: {
        ejc: [path.resolve(__dirname, 'src/index.js')],
        cli: path.resolve(__dirname, 'src/cli.js'),
        document: path.resolve(__dirname, 'src/document.js'),
        manager: path.resolve(__dirname, 'src/manager.js'),
        options: path.resolve(__dirname, 'src/options.js'),
        sheet: path.resolve(__dirname, 'src/sheet.js'),
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

    target: 'node',

    optimization: {
        minimize: false,

        splitChunks: {
           chunks: 'all'
        }
    }

}