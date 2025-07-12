const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.jsx",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/", // Ensures routes resolve correctly
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\.(png|jpe?g|gif)$/i, type: "asset/resource" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
  devServer: {
    historyApiFallback: true,
    static: { directory: path.join(__dirname, "public") },
    compress: true,
    port: 3003,
    open: true,
    hot: true,
    client: {
      overlay: true,
    },
  },
};
