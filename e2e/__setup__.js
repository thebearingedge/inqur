/* eslint-disable indent */
import 'dotenv/config'
import standalone from 'selenium-standalone'
import { remote } from 'webdriverio'
import { before, after } from 'mocha'
import { grey } from 'chalk'
import { expect } from 'chai'
import { knex, redis } from '../api/data'
import createApi from '../api/create-api'
import { fakeUser } from '../api/test/fixtures'
import createClient from '../client/create-client'

let api
let client
let browser
let selenium

const listening = (app, port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, err => {
      if (err) reject(err)
      else resolve(server)
    })
  })

const serve = () => new Promise((resolve, reject) =>
  standalone.start((err, server) => {
    if (err) return reject(err)
    resolve(server)
  }))

before(done => {
  (async () => {
    console.log(grey('\n  End-to-End Tests\n'))
    try {
      const [ _api, _client ] = await Promise.all([
        createApi(knex, redis),
        createClient({ dev: false })
      ])
      api = await listening(_api, process.env.API_PORT)
      client = await listening(_client, process.env.CLIENT_PORT)
      selenium = await serve()
      browser = remote({
        desiredCapabilities: {
          browserName: 'chrome'
        }
      })
      await browser.init()
      done()
    }
    catch (err) {
      done(err)
    }
  })()
})

after(async () => {
  browser && await browser.end()
  selenium && selenium.kill()
  api && api.close()
  client && client.close()
})

const baseUrl = process.env.CLIENT_URL

export {
  fakeUser,
  browser,
  baseUrl,
  expect,
  knex
}
