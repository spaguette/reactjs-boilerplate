module.exports = {
    plugins: [
        'react-hot-loader/babel',

        // Stage 2
        '@babel/plugin-proposal-throw-expressions',

        // Stage 3
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-import-meta',
        ['@babel/plugin-proposal-class-properties', { 'loose': false }]
    ],
    presets: ['@babel/react', '@babel/env', '@babel/typescript']
};