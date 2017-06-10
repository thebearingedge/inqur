require('dotenv/config')
const { IgnorePlugin, DefinePlugin } = require('webpack')
const BabiliPlugin = require('babili-webpack-plugin')

const {
  API_SCHEME,
  API_HOSTNAME,
  API_PORT,
  NODE_ENV
} = process.env

const API_URL = `${API_SCHEME}://${API_HOSTNAME}:${API_PORT}`

module.exports = {
  webpack: config => {
    config.plugins = config.plugins
      .concat(
        new DefinePlugin({
          'process.env.API_URL': JSON.stringify(API_URL)
        }),
        new IgnorePlugin(/pages.*\/test.*/)
      )
      .filter(plugin => plugin.constructor.name !== 'UglifyJsPlugin')
    if (NODE_ENV !== 'development') {
      config.plugins.push(new BabiliPlugin())
    }
    return config
  }
}
