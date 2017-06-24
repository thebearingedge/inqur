import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { errors } from './util'
import registration from './registration/routes'
import authenticate from './authentication/routes'

export default function createApi(knex, redis) {
  return express()
    .disable('x-powered-by')
    .use(cors())
    .use(bodyParser.json())
    .use('/registration', registration(knex))
    .use('/authenticate', authenticate(knex, redis))
    .use(errors.errorHandler())
}
