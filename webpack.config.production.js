const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: ['node_modules']
    },

    module: {
        rules: [
            /* React Loader with Babel and hot load */
            {
                test:  /\.(j|t)s(x)?$/,
                exclude: /node_modules/,
                include: [path.join(__dirname, 'src')],
                loader: 'babel-loader'
            },
            {
                test:  /\.(css|scss)$/,
                loaders: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                exportLocalsConvention: 'camelCase'
                            },
                            importLoaders: 2
                        }
                    },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({ filename: 'styles.css' })
    ]
};