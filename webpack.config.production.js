require('babel-polyfill');

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var globals = require('./buildGlobals');

globals.getDefines("'production'");

// Main config
var config = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            /* React Loader with Babel and hot load */
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include:  [path.join(__dirname, 'src')],
                loader: 'babel', // react-hot-loader, babel-loader
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            /* React Loader with Babel and hot load */
            {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract('css-loader?minimize&camelCase&localIdentName=[hash:base64:5]&importLoaders=3!postcss-loader!sass-loader' +
                    '?includePaths[]=' + (path.resolve(__dirname, './node_modules')) +
                    '!' + globals.prepend + '?appendData=' + globals.sassGlobals)
            }
        ]
    },
    postcss: function () {
        return [
            autoprefixer
        ];
    },
    plugins: [
        //Minification (uglify)
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false,
            output: {
                comments: false
            }
        }),
        //Constants for pre-compilation
        new webpack.DefinePlugin(globals.definePlugin),
        //Exclude dupes
        new webpack.optimize.DedupePlugin(),
        //Write CSS to file
        new ExtractTextPlugin('styles.css')
    ]
};

module.exports = config;