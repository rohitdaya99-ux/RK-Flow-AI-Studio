const path = require("path");

module.exports = {
  mode: "development",

  entry: "./src/index.tsx",

  target: "node-webkit",

  devtool: "source-map",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
    clean: true,
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  optimization: {
    minimize: false,
    splitChunks: false,
    runtimeChunk: false,
  },
};
