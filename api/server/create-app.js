import express, { Router } from 'express'
import bodyParser from 'body-parser'
import { errorHandler } from '../util'
import registration from '../registration/routes'

export default function createApp(knex) {

  return express()
    .disable('x-powered-by')
    .use('/api',
      new Router()
        .use(bodyParser.json())
        .use('/registration', registration(knex))
        .use(errorHandler())
    )
}
