const path = require('path')

module.exports = {
    devtool: 'eval-source-map',
    entry:  {
        main: "./src/app/app.js",
        login: "./src/login_app/LoginApp.js",
    },
    output: {
        path: "./public",
        filename: "[name].js",
    },
    devServer: {
        contentBase: 'public',
        proxy: {
            "/api/*": {
                target : {
                    host: "localhost",
                    port: 8192,
                },
            },
        },
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json",
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
            },
        ],
    },
}
