require('dotenv/config')
const { DefinePlugin } = require('webpack')

module.exports = {
  webpack: (config, { dev }) => {
    config.plugins = config.plugins
      .filter(plugin => dev
        ? plugin.constructor.name !== 'UglifyJsPlugin'
        : true
      )
      .concat(new DefinePlugin({
        'process.env.API_URL': JSON.stringify(process.env.API_URL),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }))
    return config
  }
}
