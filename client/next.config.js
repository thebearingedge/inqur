require('dotenv/config')
const { DefinePlugin } = require('webpack')

const {
  API_SCHEME,
  API_HOSTNAME,
  API_PORT
} = process.env

const API_URL = `${API_SCHEME}://${API_HOSTNAME}:${API_PORT}`

module.exports = {
  webpack: config => {
    config.plugins = config.plugins
      .filter(plugin =>
        process.env.NODE_ENV === 'production' ||
        plugin.constructor.name !== 'UglifyJsPlugin'
      )
      .concat(new DefinePlugin({
        'process.env.API_URL': JSON.stringify(API_URL)
      }))
    return config
  }
}
