const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin')
const OfflinePlugin = require('offline-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function getBuildConfig(options) {
    const plugins = [];

    const definitions = Object.keys(options.definitions || {}).reduce(
        ({ definitions, key }) => Object.assign(definitions, { key: JSON.stringify(options.definitions[key]) }),
        {
            'process.env.NODE_ENV': JSON.stringify('production')
        }
    )

    plugins.push(new webpack.DefinePlugin(definitions));

    if (options.analyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

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
            minimizer: [new UglifyJsPlugin({ cache: true, sourceMap: true })],
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
            rules: [{
                test: /\.tsx?$/,
                loaders: ['ts-loader', 'ts-nameof-loader']
            },
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
                    }, {
                        loader: 'less-loader',
                        options: {
                            paths: [path.resolve(__dirname, "node_modules")],
                            javascriptEnabled: true
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
                        options: {
                            paths: [path.resolve(__dirname, "node_modules")],
                            javascriptEnabled: true
                        }
                    }]
                })
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader?name=fonts/[name].[ext]'
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /fonts/,
                use: [{
                    loader: 'file-loader?name=images/[name].[ext]'
                }]
            }
            ]
        },
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js', '.ts', '.tsx'],
            plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
        }
    })
}