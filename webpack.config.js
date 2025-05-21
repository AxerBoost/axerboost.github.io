const path = require('path');
const webpack = require('webpack');
const defaultsDeep = require('lodash.defaultsdeep');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TWGenerateServiceWorkerPlugin = require('./src/playground/generate-service-worker-plugin');

// PostCSS
const autoprefixer = require('autoprefixer');
const postcssVars = require('postcss-simple-vars');
const postcssImport = require('postcss-import');

// Output static path
const STATIC_PATH = process.env.STATIC_PATH || '/static';

let root = process.env.ROOT || '';
if (root.length > 0 && !root.endsWith('/')) {
    throw new Error('If ROOT is defined, it must have a trailing slash.');
}

const htmlWebpackPluginCommon = {
    root: root,
    meta: JSON.parse(process.env.EXTRA_META || '{}')
};

// ========== Base config shared ==========

const base = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: process.env.SOURCEMAP ? process.env.SOURCEMAP : process.env.NODE_ENV === 'production' ? false : 'cheap-module-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        host: '0.0.0.0',
        compress: true,
        port: process.env.PORT || 8601,
        historyApiFallback: {
            rewrites: [
                { from: /^\/\d+\/?$/, to: '/index.html' },
                { from: /^\/\d+\/fullscreen\/?$/, to: '/fullscreen.html' },
                { from: /^\/\d+\/editor\/?$/, to: '/editor.html' },
                { from: /^\/\d+\/playground\/?$/, to: '/playground.html' },
                { from: /^\/\d+\/embed\/?$/, to: '/embed.html' },
                { from: /^\/addons\/?$/, to: '/addons.html' }
            ]
        }
    },
    output: {
        library: 'GUI',
        filename: process.env.NODE_ENV === 'production' ? 'js/[name].[contenthash].js' : 'js/[name].js',
        chunkFilename: process.env.NODE_ENV === 'production' ? 'js/[name].[contenthash].js' : 'js/[name].js',
        publicPath: root
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        symlinks: false,
        alias: {
            'text-encoding$': path.resolve(__dirname, 'src/lib/tw-text-encoder'),
            'scratch-render-fonts$': path.resolve(__dirname, 'src/lib/tw-scratch-render-fonts')
        }
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules\/(?!(scratch-[^\/]+|pify|@vernier\/godirect)\/src)/,
                include: [
                    path.resolve(__dirname, 'src'),
                    /node_modules[\\/]scratch-[^\\/]+[\\/]src/,
                    /node_modules[\\/]pify/,
                    /node_modules[\\/]@vernier[\\/]godirect/
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            ['react-intl', {
                                messagesDir: './translations/messages/'
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[name]_[local]_[hash:base64:5]',
                        camelCase: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                postcssImport,
                                postcssVars,
                                autoprefixer
                            ]
                        }
                    }
                }]
            }
        ]
    },
    plugins: []
};

if (!process.env.CI) {
    base.plugins.push(new webpack.ProgressPlugin());
}

const fileAssetRule = {
    test: /\.(svg|png|wav|gif|jpg|mp3|ttf|otf|ico)$/,
    loader: 'file-loader',
    options: {
        outputPath: 'static/assets/'
    }
};

// ========== Editor/Examples build ==========

const exampleConfig = defaultsDeep({}, base, {
    entry: {
        'editor': './src/playground/editor.jsx',
        'playground': './src/playground/playground.jsx',
        'player': './src/playground/player.jsx',
        'fullscreen': './src/playground/fullscreen.jsx',
        'embed': './src/playground/embed.jsx',
        'addon-settings': './src/playground/addon-settings.jsx',
        'credits': './src/playground/credits/credits.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: base.module.rules.concat([fileAssetRule])
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 2,
            minSize: 50000,
            maxInitialRequests: 5
        }
    },
    plugins: base.plugins.concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.DEBUG': Boolean(process.env.DEBUG),
            'process.env.ANNOUNCEMENT': JSON.stringify(process.env.ANNOUNCEMENT || ''),
            'process.env.ENABLE_SERVICE_WORKER': JSON.stringify(process.env.ENABLE_SERVICE_WORKER || ''),
            'process.env.ROOT': JSON.stringify(root),
            'process.env.ROUTING_STYLE': JSON.stringify(process.env.ROUTING_STYLE || 'filehash')
        }),
        new HtmlWebpackPlugin({
            chunks: ['editor'],
            template: 'src/playground/index.ejs',
            filename: 'editor.html',
            title: 'AxerBoost - Editor',
            ...htmlWebpackPluginCommon
        }),
        new HtmlWebpackPlugin({
            chunks: ['playground'],
            template: 'src/playground/index.ejs',
            filename: 'playground.html',
            title: 'AxerBoost - Playground',
            ...htmlWebpackPluginCommon
        }),
        new HtmlWebpackPlugin({
            chunks: ['player'],
            template: 'src/playground/index.ejs',
            filename: 'index.html',
            title: 'AxerBoost - Player',
            ...htmlWebpackPluginCommon
        }),
        new HtmlWebpackPlugin({
            chunks: ['fullscreen'],
            template: 'src/playground/index.ejs',
            filename: 'fullscreen.html',
            title: 'AxerBoost - Player',
            ...htmlWebpackPluginCommon
        }),
        new HtmlWebpackPlugin({
            chunks: ['embed'],
            template: 'src/playground/index.ejs',
            filename: 'embed.html',
            title: 'Embedded Project - AxerBoost',
            noTheme: true,
            ...htmlWebpackPluginCommon
        }),
        new HtmlWebpackPlugin({
            chunks: ['addon-settings'],
            template: 'src/playground/simple.ejs',
            filename: 'addons.html',
            title: 'Addon Settings - AxerBoost',
            ...htmlWebpackPluginCommon
        }),
        new HtmlWebpackPlugin({
            chunks: ['credits'],
            template: 'src/playground/simple.ejs',
            filename: 'credits.html',
            title: 'AxerBoost Credits',
            noSplash: true,
            ...htmlWebpackPluginCommon
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'static', to: '' }
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'node_modules/scratch-blocks/media', to: 'static/blocks-media' }
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'extensions/**', to: 'static', context: 'src/examples' }
            ]
        }),
        new TWGenerateServiceWorkerPlugin()
    ])
});

// ========== Library/Production build ==========

const prodOrDist = process.env.NODE_ENV === 'production' || process.env.BUILD_MODE === 'dist';

const libraryConfig = prodOrDist
    ? defaultsDeep({}, base, {
        target: 'web',
        entry: {
            'scratch-gui': './src/index.js'
        },
        output: {
            libraryTarget: 'umd',
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js',
            path: path.resolve('dist'),
            publicPath: `${STATIC_PATH}/`
        },
        externals: {
            'react': 'react',
            'react-dom': 'react-dom'
        },
        module: {
            rules: base.module.rules.concat([
                {
                    ...fileAssetRule,
                    options: {
                        outputPath: 'static/assets/',
                        publicPath: `${STATIC_PATH}/assets/`
                    }
                }
            ])
        },
        plugins: base.plugins.concat([
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'node_modules/scratch-blocks/media', to: 'static/blocks-media' }
                ]
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'src/lib/libraries/*.json', to: 'libraries', flatten: true }
                ]
            })
        ])
    })
    : [];

// ========== Export ==========

module.exports = [exampleConfig].concat(libraryConfig);
