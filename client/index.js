require('dotenv/config')
const next = require('next')
const { parse } = require('url')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    express()
      .use((req, res) => handle(req, res, parse(req.url)))
      .listen(process.env.CLIENT_PORT, () => {
        // eslint-disable-next-line
        dev && console.log(`client listening on port ${process.env.CLIENT_PORT}`)
      })
  })
