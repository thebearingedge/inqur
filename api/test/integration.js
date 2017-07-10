import { before, beforeEach, afterEach } from 'mocha'
import qs from 'qs'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { grey } from 'chalk'
import { rejected } from './shared'
import { fakeUser } from './fixtures'
import { knex, redis } from '../data'
import createApi from '../create-api'

before(() => console.log(grey('\n  API Integration Tests\n')))

let _trx
let _api
let _token
let _userId

beforeEach(done => {
  rejected(knex.transaction(trx => {
    (async () => {
      const [{ user_id }] = await trx
        .insert(fakeUser())
        .into('users')
        .returning(['user_id'])
      _trx = trx
      _userId = user_id
      _token = jwt.sign({ userId: user_id }, process.env.TOKEN_SECRET)
      await redis.setAsync(_token, _token)
      _api = createApi(_trx, redis).listen(process.env.API_PORT, done)
    })()
  }))
})

afterEach(() => _api.close(() => _trx.rollback()))

const inject = setup => done => {
  (async () => {
    await setup({ _trx, _api, _token, _userId })
    done()
  })()
}

const request = axios.create({
  baseURL: `http://localhost:${process.env.API_PORT}`,
  validateStatus: () => true,
  paramsSerializer: qs.stringify
})

export * from './shared'
export { inject, request }
