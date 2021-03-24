const path = require('path');

module.exports = {
  target: 'web',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    roots: [__dirname, '..'],
    alias: {
      "pixi-dynamic-bitmap-fonts": path.resolve(__dirname, "../src")
    }
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },

  devtool: 'inline-source-map',
  mode: 'none',
  devServer: {
    publicPath: "/",
    contentBase: "./public",
    hot: true,
    clientLogLevel: 'silent',
  },
};
