module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/src/app/app.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
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
