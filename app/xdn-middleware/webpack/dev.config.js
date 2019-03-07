const merge = require('lodash/merge')
const webpack = require('webpack')

module.exports = function createDevConfig(config) {
  return ({ entry, plugins, output, target, resolve }) => merge(config, {
    entry,
    mode: 'development',
    output: merge(output, {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    }),
    target,
    resolve: merge(resolve, {
      alias: {
        fetch: 'react-storefront/fetch'
      }
    }),
    devtool: 'cheap-module-source-map',
    plugins: [
      ...plugins,
      new webpack.ExtendedAPIPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new webpack.DefinePlugin({
        'process.env.MOOV_RUNTIME': JSON.stringify('server'),
        'process.env.MOOV_ENV': JSON.stringify('development')
      })
    ]
  })
}