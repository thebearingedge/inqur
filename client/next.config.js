require('dotenv/config')
const { DefinePlugin } = require('webpack')
const BabiliPlugin = require('babili-webpack-plugin')

const {
  API_SCHEME,
  API_HOSTNAME,
  API_PORT,
  NODE_ENV
} = process.env

const API_URL = `${API_SCHEME}://${API_HOSTNAME}:${API_PORT}`

const noop = () => ({ apply() {} })

const define = new DefinePlugin({
  'process.env.API_URL': JSON.stringify(API_URL)
})

const babili = NODE_ENV === 'production' ? new BabiliPlugin() : noop()

module.exports = {
  webpack: config => {
    config.plugins = config.plugins
      .filter(({ constructor }) => constructor.name !== 'UglifyJsPlugin')
      .concat(define, babili)
    return config
  }
}
