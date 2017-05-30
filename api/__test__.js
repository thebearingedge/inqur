import 'dotenv/config'
import chai from 'chai'
import { chaiStruct } from 'chai-struct'
import sinonChai from 'sinon-chai'
import { after } from 'mocha'
import knex from './data'

chai.use(chaiStruct)
chai.use(sinonChai)

after(() => knex.destroy())

export const begin = setup => done => {
  knex.transaction(trx => {
    setup(trx)
    done()
  })
  .catch(_ => _)
}
