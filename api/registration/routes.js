import { Router } from 'express'
import joi from 'joi'
import usersData from './users.data'
import { wrap, validate } from '../util'

const newUser = joi.object().keys({
  username: joi.string().trim().required(),
  password: joi.string().trim().required(),
  email: joi.string().trim().email().required()
})

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
    .post(validate({ body: newUser }), register(users))

  return router
}
