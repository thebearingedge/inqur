import { after } from 'mocha'
import knex from '../data'
export * from './shared'

after(() => knex.destroy())

export const begin = setup => done => {
  knex.transaction(trx => {
    setup(trx)
    done()
  })
  .catch(_ => _)
}
