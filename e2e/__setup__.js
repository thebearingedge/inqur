import 'dotenv/config'
import { before, after } from 'mocha'
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

const {
  CLIENT_SCHEME,
  CLIENT_HOSTNAME,
  CLIENT_PORT
} = process.env

const baseUrl = `${CLIENT_SCHEME}://${CLIENT_HOSTNAME}:${CLIENT_PORT}`

export {
  fakeUser,
  browser,
  baseUrl,
  knex
}
