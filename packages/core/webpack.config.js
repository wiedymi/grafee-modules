const path = require('path')
const nodeExternals = require('webpack-node-externals')

const build = {
  entry: `./index.js`,
  mode: 'production',
  target: 'node',
  output: {
    filename: `index.js`,
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['*', '.mjs', '.js', '.vue', '.json', '.gql', '.graphql'],
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  externals: [nodeExternals()],
}

module.exports = [build]
