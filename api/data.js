import Knex from 'knex'
import { types } from 'pg'
import postgresDate from 'postgres-date'

const parseDate = date => postgresDate(date).toJSON()

types.setTypeParser(1082, parseDate)
types.setTypeParser(1114, parseDate)
types.setTypeParser(1184, parseDate)

export default new Knex({
  client: 'pg',
  connection: {
    database: process.env.PGDATABASE
  }
})
