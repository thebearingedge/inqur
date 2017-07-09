import 'dotenv/config'
import { before, after } from 'mocha'
import { grey } from 'chalk'
import Nightmare from 'nightmare'
import { knex, redis } from '../api/data'
import createApi from '../api/create-api'
import { fakeUser } from '../api/test/fixtures'
import createClient from '../client/create-client'

let api
let client

const browser = new Nightmare({
  show: process.env.SHOW_E2E
})

before(done => {
  console.log(grey('\n  End-to-End Tests\n'))
  Promise.all([
    createApi(knex, redis),
    createClient({ dev: false })
  ])
  .then(([_api, _client]) => {
    api = _api.listen(process.env.API_PORT, err => {
      if (err) return done(err)
      client = _client.listen(process.env.CLIENT_PORT, done)
    })
  })
})

after(() => {
  api && api.close(() => {
    client && client.close()
  })
})

const baseUrl = process.env.CLIENT_URL

export {
  fakeUser,
  browser,
  baseUrl,
  knex
}
