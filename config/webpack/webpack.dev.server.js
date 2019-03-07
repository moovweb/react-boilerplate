const createDevConfig = require('../../app/xdn-middleware/webpack/dev.config')
const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const base = require('../../internals/webpack/webpack.base.babel')

const config = base({
  mode: 'development',

  entry: [
    path.join(process.cwd(), 'app/xdn-middleware/ssr.js'), // Start with js/ssr.js
  ],

  // Don't use hashes in dev mode for better performance
  output: {
    filename: 'ssr.js',
    chunkFilename: 'ssr.chunk.js',
  },

  target: 'node',

  // Add development plugins
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new WriteFilePlugin(),
  ],

  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-source-map',

  performance: {
    hints: false
  },

  babelQuery: {
    envName: 'server'
  }
});

module.exports = createDevConfig(config)