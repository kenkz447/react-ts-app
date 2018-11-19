const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
    lessLoaderOptions: {
        paths: [path.resolve(__dirname, "node_modules")],
        javascriptEnabled: true,
        modifyVars: {
            '@blue-6': '#9980FA',
            '@font-family': "'Roboto Mono', monospace",
            '@font-size-base': '13px',
            '@font-size-sm': '11px'
        }
    },
    modules: {
        rules: {
            typescript: {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        getCustomTransformers: () => ({
                            before: [tsImportPluginFactory( /** options */)]
                        }),
                        compilerOptions: {
                            module: 'es2015'
                        }
                    }
                }, {
                    loader: 'ts-nameof-loader'
                }],
                exclude: /node_modules/
            },
            fonts: {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader?name=[name].[ext]'
                }]
            },
            images: {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'file-loader?name=[name].[ext]'
                }]
            }
        }
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.ts', '.tsx'],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
    }
}