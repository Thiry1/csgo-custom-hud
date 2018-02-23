const config = require("../webpack.config.js");
const path = require("path");

config.entry  = undefined;
config.plugins  = undefined;
config.externals  = undefined;
config.output  = undefined;
config.target = undefined;

config.module.rules.push(
    {
        test: /\.ts(x?)$/,
        enforce: "pre",
        use: "tslint-loader",
        include: {
            include: [path.join(__dirname, "../src/views")]
        },
    }
);

module.exports = config;
