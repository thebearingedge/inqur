import 'dotenv/config'
import { before, after } from 'mocha'
import knex from '../api/data'
import Nightmare from 'nightmare'
import createApi from '../api/create-api'
import createClient from '../client/create-client'

let api
let client

const browser = new Nightmare({
  show: process.env.SHOW_E2E
})

before(done => {
  Promise.all([
    createApi(knex),
    createClient({ dev: false })
  ])
  .then(([_api, _client]) => {
    api = _api.listen(process.env.API_PORT, () => {
      client = _client.listen(process.env.CLIENT_PORT, done)
    })
  })
})

after(() => api.close(() => client.close()))

const {
  CLIENT_SCHEME,
  CLIENT_HOSTNAME,
  CLIENT_PORT
} = process.env

const baseUrl = `${CLIENT_SCHEME}://${CLIENT_HOSTNAME}:${CLIENT_PORT}`

export {
  browser,
  baseUrl
}
