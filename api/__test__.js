import 'dotenv/config'
import chai, { expect } from 'chai'
import { chaiStruct } from 'chai-struct'
import sinonChai from 'sinon-chai'
import { after } from 'mocha'
import knex from './data'

process.env.NODE_ENV = 'test'

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

export { expect }
