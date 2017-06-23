import 'dotenv/config'
import { knex, redis } from './data'
import createApi from './create-api'

createApi(knex, redis)
  .listen(process.env.API_PORT, () => {
    process.env.NODE_ENV !== 'production' &&
    // eslint-disable-next-line
    console.log(`api listening on port ${process.env.API_PORT}`)
  })
