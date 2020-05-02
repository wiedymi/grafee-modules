const path = require("path");
const webpackMerge = require("webpack-merge");

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

const sharedClientConfig = {
  module: {
    rules: [
      {
        test: /\.(js|jsx?)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          envName: "client",
        },
      },
    ],
  },
};

const client = (env = {}) =>
  webpackMerge(sharedConfig(env, "client"), sharedClientConfig);

module.exports = [client];
