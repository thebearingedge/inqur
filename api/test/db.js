import { before, beforeEach, afterEach, after } from 'mocha'
import { grey } from 'chalk'
import { rejected } from './shared'
import { knex, redis } from '../data'

before(() => console.log(grey('\n  API Database Tests\n')))

let _trx
let _knex
let _redis

beforeEach(done => {
  rejected(knex.transaction(trx => {
    (async () => {
      _trx = trx
      _knex = knex
      _redis = redis
      await redis.flushallAsync()
      done()
    })()
  }))
})

afterEach(() => _trx.rollback())

after(() => Promise.all([
  knex.destroy(),
  redis.quit()
]))

const inject = setup => done => {
  (async () => {
    await setup({ _trx, _knex, _redis })
    done()
  })()
}

export * from './shared'
export { inject }
