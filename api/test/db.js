import { before, beforeEach, after } from 'mocha'
import { grey } from 'chalk'
import { rejected } from './shared'
import { knex, redis } from '../data'

before(() => console.log(grey('\n  API Database Tests\n')))

after(() => Promise.all([
  knex.destroy(),
  redis.quit()
]))

beforeEach(() => redis.flushallAsync())

const begin = setup => done => {
  rejected(knex.transaction(trx => {
    setup(trx)
    done()
  }))
}

export * from './shared'
export { begin, knex, redis }
