const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    inline:true,
    contentBase: "dist",
    port: 3000,
  },
  devtool: "inline-source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
            from: "src/assets",
            to: "assets",
        },
        {
            from: "src/core",
            to: "core",
        },
      ],
    }),
    new HTMLWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
    }),
  ],
};
