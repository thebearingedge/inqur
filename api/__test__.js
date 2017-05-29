import Knex from 'knex'
import chai from 'chai'
import { chaiStruct } from 'chai-struct'
import { after } from 'mocha'

chai.use(chaiStruct)

const knex = Knex({ client: 'pg', connection: { database: 'voting-app' } })

after(() => knex.destroy())

const begin = setup => done => {
  knex.transaction(trx => {
    setup(trx)
    done()
  })
  .catch(_ => _)
}

export {
  begin
}
