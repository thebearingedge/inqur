import Knex from 'knex'

export default new Knex({
  client: 'pg',
  connection: {
    database: process.env.PGDATABASE
  }
})
