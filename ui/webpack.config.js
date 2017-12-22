'use strict';

// nodejs
const path = require('path');

// webpack
const webpack = require('webpack');

// webpack plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// export config generator


module.exports = createWebpackConfig;

// hoisting
function createWebpackConfig(){
    const config = {};

    let outputDir = process.env.OUTPUT_DIR || './public';

    if (!path.isAbsolute(outputDir)){
        outputDir = path.resolve(__dirname, outputDir);
    }

    console.log(__dirname, outputDir);

    // entry points
    config.entry = {
        'polyfills': './ui/src/polyfills.ts',
        'vendor': './ui/src/vendor.ts',
        'app': './ui/src/main.ts' // our angular app
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
    config.module.rules.push({
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader?keepUrl=true'],
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
    });

    // Support for *.json files.
    config.module.rules.push({
        test: /\.json$/, loader: 'json-loader'
    });

    // Support for *.html files
    config.module.rules.push({
        test: /\.html$/,
        loader: 'raw-loader'
    });

    // Support for *.css files (outside of the app)
    config.module.rules.push({
        test: /\.css$/,
        exclude: [
            path.resolve(__dirname, './src')
        ],
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
            {
                loader: 'css-loader',
                options: {
                    minimize: true
                }
            },
            {
                loader: 'postcss-loader'
            }]
        })
    });

    // Support for *.css files (inside of the app)
    config.module.rules.push({
        test: /\.css$/,
        include:  [
            path.resolve(__dirname, './src')
        ],
        loader: 'raw-loader'
    });

    // Support for *.scss files
    config.module.rules.push({
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                loader: 'css-loader',
                options: {
                    minimize: true
                }
            },
            {
                loader: 'postcss-loader'
            },
            {
                loader: 'sass-loader'
            }]
        })
    });

    // Dev server
    config.devServer = {
        contentBase: outputDir,
        noInfo: false,
        hot: true,
        inline: true,
        port: 8083
    };

    // Plugins
    config.plugins = [];

    //config.plugins.push(new webpack.HotModuleReplacementPlugin());

    config.plugins.push(new webpack.DefinePlugin({
        // Environment helpers
        'process.env': {
            ENV: JSON.stringify(process.env.ENVIRON)
        }
    }));

    config.plugins.push(new webpack.ContextReplacementPlugin(
        /@angular[\\\/]core[\\\/]esm5/,
        path.resolve(__dirname, './src')
    ));

    config.plugins.push(new CommonsChunkPlugin({
        name: ['vendor', 'polyfills']
    }));

    config.plugins.push(new HtmlWebpackPlugin({
        template: './ui/src/index.html',
        chunksSortMode: 'dependency'
    }));

    config.plugins.push(new ExtractTextPlugin({
        filename: 'css/[name].[hash].css',
        //disable: !isProd
    }));

    return config;
}


