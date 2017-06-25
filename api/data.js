import Knex from 'knex'
import { types } from 'pg'
import postgresDate from 'postgres-date'
import { createClient, RedisClient } from 'redis'
import { promisifyAll } from './util'

const parseDate = date => postgresDate(date).toJSON()

types.setTypeParser(1082, parseDate)
types.setTypeParser(1114, parseDate)
types.setTypeParser(1184, parseDate)

promisifyAll(RedisClient.prototype)

export const knex = new Knex({
  client: 'pg',
  connection: process.env.POSTGRES_URL
})

export const redis = createClient(process.env.REDIS_URL)
