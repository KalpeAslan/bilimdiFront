const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const fileName = (ext) => isDev ? `[name].[contenthash].${ext}` : `[name].[contenthash].${ext}`

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

const cssLoader = (loader) => {
    const loaders = [{
        loader: MiniCssExtractPlugin.loader,
    }, 'css-loader']
    if (loader) {
        loaders.push(loader)
    }
    return loaders
}
const babelOptions = (loader) => {
    const loaders = {
        loader: "babel-loader",
        options: {
            presets: ['@babel/preset-env'],
            plugins: [
                '@babel/plugin-proposal-class-properties'
            ]
        },

    }
    if (loader) {
        loaders.options.presets.push(loader)
    }
    return loaders
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]
    if (isDev) {
        loaders.push('eslint-loader')
    }
    return loaders
}

module.exports = {
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
    },
    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/assets/icons/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }, ],
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css')
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    module: {
        rules: [
            /**
             * *css files
             */
            {
                test: /\.css$/,
                use: cssLoader()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoader('sass-loader')
            },
            /**
             * *images and fonts
             */
            {
                test: /\.(png|jpg|jpeg|svg|gif|webp)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            /**
             * *JS files
             */
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.m?ts$/,
                exclude: /node_modules/,
                use: babelOptions('@babel/preset-typescript')
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: babelOptions('@babel/preset-react')
            }
        ]
    },
    devServer: {
        port: 4000,
        /**
         * !This option needs only for development
         */
        writeToDisk: isDev
    },
    devtool: isDev && 'source-map',
    resolve: {
        // extensions: ['js', 'jsx', 'ts', 'css', 'scss', 'png', 'jpeg', 'svg', 'webp', 'gif'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            assets: './src/assets/',
            images: './src/assets/images/',
            icons: './src/assets/icons/',
            scss: './src/assets/scss/',
            atoms: './src/components/atoms',
            moleculus: './src/components/moleculus',
            organisms: './src/components/organisms',
            templates: './src/components/templates',
            api: './src/api/',
            pages: './src/pages/',
            services: './src/services/',
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}