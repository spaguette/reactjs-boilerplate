import webpack from 'webpack';
import path from 'path';

const config: webpack.Configuration = {
    devServer: {
        host: '0.0.0.0',
        port: 8081,
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
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: ['node_modules'],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },

    module: {
        rules: [
            /* React Loader with Babel and hot load */
            {
                test: /\.(j|t)s(x)?$/,
                exclude: /node_modules/,
                include: [path.join(__dirname, 'src')],
                loader: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                loaders: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]',
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
        new webpack.HotModuleReplacementPlugin()
    ]
};

export default config;