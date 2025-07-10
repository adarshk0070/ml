const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
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
    historyApiFallback: true, // Critical for React Router
    static: { directory: path.join(__dirname, "public") },
    compress: true,
    port: 8080,
    open: true,
  },
  
  test: /\.(webp|png|jpg|jpeg|gif)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192,
        mimetype: 'image/webp',
        name: 'static/media/[name].[hash:8].[ext]',
      },
    },
  ],
},

