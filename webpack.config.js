// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const NODE_ENV = process.env.NODE_ENV || "production";
const env = NODE_ENV.split(":");
const mode = env[0];
const plugins = [];

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins,
  mode,
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    alias: {
      utils: path.resolve(__dirname, "src/utils/"),
      // octo: path.resolve(__dirname, "src/octo/"),
      types: path.resolve(__dirname, "src/types/"),
      api: path.resolve(__dirname, "src/api/"),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        loader: "ts-loader",
      },
    ],
  },
  target: "node"
};