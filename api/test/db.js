import { beforeEach, after } from 'mocha'
import { knex, redis } from '../data'
export * from './shared'

after(() => Promise.all([
  knex.destroy(),
  redis.quit()
]))

beforeEach(() => redis.flushallAsync())

export const begin = setup => done => {
  knex.transaction(trx => {
    setup(trx)
    done()
  })
  .catch(_ => _)
}

export { redis }
