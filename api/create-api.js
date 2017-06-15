import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { errors } from './util'
import registration from './registration/routes'

export default function createApi(knex) {
  return express()
    .disable('x-powered-by')
    .use(cors())
    .use(bodyParser.json())
    .use('/registration', registration(knex))
    .use(errors.errorHandler())
}
