const path = require('path')

module.exports = {
  devtool: 'eval-source-map',
  entry:  [
      "./src/app/app.js",
  ],
  output: {
    path: "./public",
    filename: "bundle.js",
  },
  devServer: {
      contentBase: 'public',
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



