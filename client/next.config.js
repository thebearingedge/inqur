require('dotenv/config')
const { DefinePlugin } = require('webpack')

const {
  API_SCHEME,
  API_HOSTNAME,
  API_PORT
} = process.env

const API_URL = `${API_SCHEME}://${API_HOSTNAME}:${API_PORT}`

const define = new DefinePlugin({
  'process.env.API_URL': JSON.stringify(API_URL)
})

module.exports = {
  webpack: config => {
    config.plugins = config.plugins
      .filter(({ constructor }) => constructor.name !== 'UglifyJsPlugin')
      .concat(define)
    return config
  }
}
