const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fileName = (ext) => isDev ? `[name].[contenthash].${ext}` : `[name].[contenthash].${ext}`
const Dotenv = require('dotenv-webpack')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const babelOptions = (loader) => {
    const loaders = {
        loader: 'babel-loader',
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

const getPath = (pathElem) => path.join(__dirname , '/src/',pathElem)


module.exports = {
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.jsx')],
    },
    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        // isDev && new EslintPlugin({
        //     extensions: ['js', 'jsx', 'ts']
        // }),
        new CaseSensitivePathsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new Dotenv({
            path:path.resolve(__dirname,'.env')
        }),
    ],
    module: {
        rules: [
            /**
             * images and fonts
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
             * JS/TS files
             */
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                // use: jsLoaders()
                use: babelOptions()
            },
            {
                test: /\.m?ts$/,
                exclude: /node_modules/,
                use: babelOptions('@babel/preset-typescript')
            },
            {
                test: /\.m?tsx$/,
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
        port: 6060,
        historyApiFallback: true,
        /**
         * !This option needs only for development
         */
        // writeToDisk: isDev
    },
    node: {
        __dirname: false
    },
    devtool: isDev && 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            assets: path.resolve(__dirname,'./src/assets/'),
            fonts:  getPath('/assets/fonts/'),
            images: getPath('/assets/images/'),
            icons: getPath('/assets/images/icons'),
            styles: getPath('/assets/styles/'),
            cpm: getPath('/components/'),
            store: getPath('/store'),
            pages: getPath('/pages/'),
            services: getPath('/services/'),
            hooks: getPath('/hooks/'),
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}