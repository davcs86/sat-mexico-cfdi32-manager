'use strict';

// nodejs
const path = require('path');

// webpack
const webpack = require('webpack');

// webpack plugins


// export config generator


module.exports = createWebpackConfig;

// hoisting
function createWebpackConfig(){
    const config = {};

    let outputDir = process.env.OUTPUT_DIR || './public/js';

    if (!path.isAbsolute(outputDir)){
        outputDir = path.resolve(__dirname, outputDir);
    }

    // entry points
    config.entry = {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts' // our angular app
    };

    // dev-tools
    config.devtool = 'source-map';

    // output
    config.output = {
        path: outputDir,
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    };

    // resolve
    config.resolve = {
        // only discover files that have those extensions
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
    };

    // loaders

    config.module = {
        rules: []
    };

    // Support for .ts files.
    config.module.push({
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader'],
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
    });

    // Support for *.json files.
    config.module.push({
        test: /\.json$/, loader: 'json-loader'
    });

    // Support for *.css files
    config.module.push({
        test: /\.css$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
        })
    });

    return config;
}


