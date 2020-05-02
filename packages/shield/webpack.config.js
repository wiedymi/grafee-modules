const path = require("path");
const webpackMerge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

const sharedConfig = (env, platform) => {
  const config = {
    entry: `./src/index.js`,
    mode: env.ENVIRONMENT ? "production" : "development",
    output: {
      filename: `${platform}.js`,
      path: path.resolve(__dirname, "build"),
    },
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      extensions: [".jsx", ".js"],
    },
  };

  if (!env.prod) {
    config.devServer = {
      writeToDisk: true,
    };
  }

  return config;
};

const build = (env = {}) =>
  webpackMerge(sharedConfig(env, "index"), {
    target: "node",
    node: {
      __dirname: false,
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            envName: "server",
          },
        },
      ],
    },
    externals: [nodeExternals({ importType: "commonjs" })],
  });

module.exports = [build];
