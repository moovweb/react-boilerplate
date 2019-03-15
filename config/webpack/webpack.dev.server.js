const createDevConfig = require('react-moovweb-xdn/webpack/dev.config')
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const base = require('../../internals/webpack/webpack.base.babel')

const config = base({
  mode: 'development',

  // Add development plugins
  plugins: [
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