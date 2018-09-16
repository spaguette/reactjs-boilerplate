const webpack = require('webpack');
const path = require('path');

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: '8081',
        historyApiFallback: true
    },

    entry: './src/index.js',

    devtool: 'eval-source-map',

    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules']
    },

    module: {
        rules: [
            /* React Loader with Babel and hot load */
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: [path.join(__dirname, 'src')],
                loader: 'babel-loader'
            },
            {
                test:  /\.(css|scss)$/,
                loaders: [
                    {
                        loader: 'style-loader',
                        options: { singleton: true }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 2,
                            camelCase: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};