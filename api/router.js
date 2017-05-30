import { Router } from 'express'
import bodyParser from 'body-parser'
import { errorHandler } from './util'
import registration from './registration/routes'

export default function apiRouter(knex) {

  return new Router()
    .use(bodyParser.json())
    .use('/registration', registration(knex))
    .use(errorHandler())
}
