const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./app/script.js",
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "./app/index.html", to: "index.html" },
      { from: "./app/style.css", to: "style.css" }
    ]),
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
