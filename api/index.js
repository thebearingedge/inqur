import 'dotenv/config'
import knex from './data'
import { createApp } from './server'

createApp(knex)
  .listen(process.env.PORT, () => {
    process.env.NODE_ENV === 'development' &&
    // eslint-disable-next-line
    console.log(`Listening on port ${process.env.PORT}`)
  })
