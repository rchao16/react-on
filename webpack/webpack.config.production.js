var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var rimraf = require('rimraf');


module.exports = {
  mode: "production",
  entry: ["./src/index.js"],
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: require('./webpack.loaders.js')
  },
  optimization: {
    minimize: true
  },
  plugins: [
    function() {
      console.log("Clearing /dist directory");
      rimraf.sync(path.join(__dirname, "..", "dist"), require('fs'), (er) => {
        if(er) console.log("Clearing of /dist directory failed", er);
      });
    },
    new ExtractTextPlugin("style.css"),
    new webpack.DefinePlugin({
      "environment": '"production"',
      NODE_ENV: JSON.stringify("production")
    }),
    new HtmlWebpackPlugin({template: path.join("src", "public", "index.ejs")}),
  ],
  resolve: {
    modules: ["node_modules", "src"]
  }
}
