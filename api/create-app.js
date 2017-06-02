import express from 'express'
import apiRouter from './router'

export default function createApp(knex) {

  return express()
    .use('/api', apiRouter(knex))
}
