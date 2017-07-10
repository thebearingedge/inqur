import { before } from 'mocha'
import qs from 'qs'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { grey } from 'chalk'
import { rejected } from './shared'
import { fakeUser } from './fixtures'
import { knex, redis } from '../data'
import createApi from '../create-api'

before(() => console.log(grey('\n  API Integration Tests\n')))

const start = setup => done => {
  rejected(knex.transaction(trx => {
    (async () => {
      const [{ user_id: userId }] = await trx
        .insert(fakeUser())
        .into('users')
        .returning('*')
      const token = jwt.sign({ userId }, process.env.TOKEN_SECRET)
      await redis.setAsync(token, token)
      const server = createApi(trx, redis)
        .listen(process.env.API_PORT, () => {
          setup(trx, server, userId, token)
          done()
        })
    })()
  }))
}

const request = axios.create({
  baseURL: `http://localhost:${process.env.API_PORT}`,
  validateStatus: () => true,
  paramsSerializer: qs.stringify
})

export * from './shared'
export { start, request }
