const next = require('next')
const { join } = require('path')
const { parse } = require('url')
const express = require('express')
const createProxy = require('./create-proxy')
const sessions = require('./session/middleware')

module.exports = function createClient({ dev, dir = __dirname }) {
  const pages = next({ dev, dir })
  const handler = pages.getRequestHandler()
  return pages
    .prepare()
    .then(() => express()
      .disable('x-powered-by')
      .use(sessions())
      .use('/api', createProxy())
      .use(express.static(join(__dirname, 'static')))
      .use((req, res) => handler(req, res, parse(req.url)))
    )
}
