const { Router } = require('express')
const proxy = require('express-http-proxy')

module.exports = function createProxy() {
  return new Router()
    .use('/', proxy(process.env.API_URL, {
      parseReqBody: false
    }))
}
