const
    webpack = require('webpack')
path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = webpack;

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    devtool: debug ? "source-map" : undefined,
    devServer: {
        host: '0.0.0.0',
        publicPath: "/",
        contentBase: './web',
        noInfo: false,
        hot: true,
        inline: true,
        historyApiFallback: true,
        port: 8087,
        stats: {
            colors: true
        }
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json",],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/, loaders: [
                    {
                        loader: "babel-loader",
                        query: {
                            presets: [
                                '@babel/preset-react',
                                ['@babel/preset-env', {
                                    "targets": {
                                        "browsers": ["last 2 versions", "safari >= 10",],
                                    },
                                }],
                            ],
                        },
                    },
                    "awesome-typescript-loader",
                ],
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Http Deployer Client',
            template: path.resolve('./templates/index.ejs'),
            minify: {
                minifyCSS: !debug,
                minifyJS: !debug,
                removeComments: !debug,
                trimCustomFragments: !debug,
                collapseWhitespace: !debug,
            },
        }),
        new DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ],
};
