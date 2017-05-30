import { Router } from 'express'
import usersData from './users.data'
import wrap from '../util/async-wrap'

export const register = users =>
  wrap(async ({ body }, res) => {
    const created = await users.create(body)
    res.status(201).json(created)
  })


export default function routes(knex) {

  const router = new Router()
  const users = usersData(knex)

  router
    .route('/')
    .post(register(users))

  return router
}
