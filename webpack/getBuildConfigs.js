const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const OfflinePlugin = require('offline-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./common');

function makeDefinitions(definitionValues) {
    return Object.keys(definitionValues).reduce(
        (definitionObj, key) => Object.assign(definitionObj, { key: JSON.stringify(options.definitions[key]) }))
}

module.exports = function getBuildConfig(options) {
    const plugins = [];

    const definitions = options.definitions && makeDefinitions(options.definitions)
    if (definitions) {
        plugins.push(new webpack.DefinePlugin(definitions));
    }

    if (options.analyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    plugins.push(new webpack.NamedChunksPlugin());

    plugins.push(new ExtractTextPlugin({
        filename: '[name].[hash].css',
        allChunks: true
    }));

    if (options.sourceMap) {
        plugins.push(new webpack.SourceMapDevToolPlugin({
            filename: '[name].[chunkhash].js.map',
            include: /\.js$/,
            exclude: [/vendors/g],
        }));
    }

    if (options.compression) {
        plugins.push(new CompressionPlugin({
            test: /\.(js|css)/,
            exclude: /\.map/,
            deleteOriginalAssets: true,
            cache: true
        }));
    }

    plugins.push(new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: 'body'
    }));

    plugins.push(new OfflinePlugin());

    return ({
        mode: 'production',
        entry: {
            app: './src/index'
        },
        output: {
            publicPath: '/static/',
            path: path.join(__dirname, '..', 'dist', 'static'),
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js'
        },
        optimization: {
            concatenateModules: true,
            noEmitOnErrors: true,
            namedModules: true,
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    sourceMap: options.sourceMap,
                    parallel: true
                })
            ],
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        chunks: 'initial'
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            },
        },
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /\.(css|sass|scss)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader'
                        }, {
                            loader: 'resolve-url-loader',
                        }, {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [path.resolve(__dirname, 'src')]
                            }
                        }]
                    })
                }, {
                    test: /\.(less)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader'
                        }, {
                            loader: 'resolve-url-loader',
                        }, {
                            loader: 'less-loader',
                            options: common.lessLoaderOptions
                        }]
                    })
                },
                common.modules.rules.typescript,
                common.modules.rules.fonts,
                common.modules.rules.images
            ]
        },
        resolve: common.resolve
    })
}