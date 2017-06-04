import 'dotenv/config'
import knex from './data'
import { createApp } from './server'

createApp(knex)
  .listen(process.env.API_PORT, () => {
    process.env.NODE_ENV !== 'production' &&
    // eslint-disable-next-line
    console.log(`api listening on port ${process.env.API_PORT}`)
  })
