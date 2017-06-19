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

const define = new DefinePlugin({
  'process.env.API_URL': JSON.stringify(API_URL)
})

module.exports = {
  webpack: config => {
    const plugins = config.plugins
      .filter(({ constructor }) => constructor.name !== 'UglifyJsPlugin')
      .concat(define)
    if (NODE_ENV === 'production') {
      plugins.push(new BabiliPlugin())
    }
    return { ...config, plugins }
  }
}
