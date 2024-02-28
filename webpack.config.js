const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const LOADERS = [
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: "babel-loader",
  },
  {
    test: /\.s[ac]ss$/i,
    use: ["style-loader", "css-loader", "sass-loader"],
  },
];

const PLUGINS = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
];

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      constants: path.resolve(__dirname, "src/constants"),
      providers: path.resolve(__dirname, "src/providers"),
      helpers: path.resolve(__dirname, "src/helpers"),
      types: path.resolve(__dirname, "src/types"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: LOADERS,
  },
  plugins: PLUGINS,
  devServer: {
    port: 3002,
    historyApiFallback: true,
  },
};
