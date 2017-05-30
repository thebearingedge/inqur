import 'dotenv/config'
import express from 'express'
import apiRouter from './router'
import knex from './data'

express()
  .use('/api', apiRouter(knex))
  .listen(process.env.PORT, () => {
    process.env.NODE_ENV === 'development' &&
    // eslint-disable-next-line
    console.log(`Listening on port ${process.env.PORT}`)
  })
