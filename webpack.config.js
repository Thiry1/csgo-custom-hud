const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: {
        index: ["babel-polyfill", path.join(__dirname, "src/index.tsx")],
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
    ],
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /(\.ts|\.tsx)$/,
                exclude: [/__tests__/, /__mocks__/, /node_modules/],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["es2015", { modules: false }],
                            ],
                            plugins: ["syntax-dynamic-import"],
                            cacheDirectory: true,
                        },
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: {
                                // import 文を require に書き換えない.
                                "module": "esnext",
                                "moduleResolution": "node",
                            },
                        },
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            camelCase: true,
                            importLoaders: 2,
                            localIdentName: "___[local]___[hash:base64:5]",
                        },
                    },
                    "sass-loader",
                ],
                include: [path.join(__dirname, "./src/views")],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]",
                            publicPath: "http://127.0.0.1:3000/",
                        }
                    }
                ],
                include: [path.join(__dirname, "./src/resources")],
            },
        ],
    },
    externals: {
        "nw.gui": "nw.gui",
    }
};
