const path = require("path");
const webpackMerge = require("webpack-merge");
const webpack = require("webpack");

const sharedConfig = (env, platform) => {
  const config = {
    entry: `./src/index.js`,
    mode: env.ENVIRONMENT ? "production" : "development",
    target: "web",
    output: {
      filename: `${platform}.js`,
      path: path.resolve(__dirname, "build"),
      library: "",
      libraryTarget: "umd",
    },
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      extensions: [".jsx", ".js"],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": env ? '"development"' : '"production"',
        "process.env.BROWSER": JSON.stringify(true),
        __DEV__: env,
      }),
    ],
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
  webpackMerge(sharedConfig(env, "index"), sharedClientConfig);

module.exports = [client];
