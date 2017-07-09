import { before } from 'mocha'
import qs from 'qs'
import axios from 'axios'
import { grey } from 'chalk'
import { rejected } from './shared'
import { knex, redis } from '../data'
import createApi from '../create-api'

before(() => console.log(grey('\n  API Integration Tests\n')))

const start = setup => done => {
  begin(trx => {
    const server = createApi(trx, redis).listen(process.env.API_PORT, () => {
      setup(trx, server)
    })
  })(done)
}

export const begin = setup => done => {
  rejected(knex.transaction(trx => {
    setup(trx)
    done()
  }))
}

const request = axios.create({
  baseURL: `http://localhost:${process.env.API_PORT}`,
  validateStatus: () => true,
  paramsSerializer: qs.stringify
})

export * from './shared'
export { start, request }
