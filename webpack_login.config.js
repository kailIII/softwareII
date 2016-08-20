const path = require('path')

module.exports = {
    devtool: 'eval-source-map',
    entry:  [
        "./src/login_app/LoginApp.js",
    ],
    output: {
        path: "./login_assets/",
        filename: "login_bundle.js",
    },
    devServer: {
        contentBase: 'login_assets',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
            },
        ],
    },
}
