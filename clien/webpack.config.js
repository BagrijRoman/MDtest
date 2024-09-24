const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devServerPort = 3000;
const distPath = path.resolve(__dirname, "build");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false
        },
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/i, // Test for .scss or .sass files
        use: [
          'style-loader', // Injects styles into the DOM
          'css-loader',   // Translates CSS into CommonJS
          'sass-loader',  // Compiles Sass to CSS
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      assert: require.resolve("assert"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify"),
      url: require.resolve("url"),
      buffer: require.resolve('buffer/'),
      vm: require.resolve('vm-browserify'),
      util: require.resolve('util/'),
      process: require.resolve('process/browser'),
    },
  },
  output: {
    filename: "bundle.js",
    path: distPath,
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      favicon: "./public/favicon.ico",
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  ],
  devServer: {
    static: "./dist",
    port: devServerPort,
    open: true,
    hot: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
