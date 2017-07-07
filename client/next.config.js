require('dotenv/config')
const { DefinePlugin } = require('webpack')

module.exports = {
  webpack: config => {
    config.plugins = config.plugins
      .filter(plugin =>
        process.env.NODE_ENV === 'production' ||
        plugin.constructor.name !== 'UglifyJsPlugin'
      )
      .concat(new DefinePlugin({
        'process.env.API_URL': JSON.stringify(process.env.API_URL)
      }))
    return config
  }
}
