import { beforeEach, after } from 'mocha'
import { knex, redis } from '../data'
export * from './shared'

after(() => Promise.all([
  knex.destroy(),
  redis.quit()
]))

beforeEach(() => redis.flushallAsync())

export const rejected = promise => promise.catch(err => err)

export const begin = setup => done => {
  rejected(knex.transaction(trx => {
    setup(trx)
    done()
  }))
}

export { redis }
