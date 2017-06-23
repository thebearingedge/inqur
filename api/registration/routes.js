import { Router } from 'express'
import joi from 'joi'
import usersData from './users-data'
import { wrap, validate } from '../util'

const newUser = joi.object().keys({
  username: joi.string().trim().required(),
  password: joi.string().trim().required(),
  email: joi.string().trim().email().required()
})

const newUsername = joi.object().keys({
  username: joi.string().trim().required()
})

export const register = users =>
  wrap(async ({ body }, res) => {
    const created = await users.create(body)
    res.status(201).json(created)
  })

export const canRegister = users =>
  wrap(async ({ query: { username } }, res) => {
    const isAvailable = await users.isAvailable({ username })
    res.json({ username, isAvailable })
  })

export default function routes(knex) {
  const users = usersData(knex)
  const router = new Router()
  router
    .route('/')
    .post(validate({ body: newUser }), register(users))
    .get(validate({ query: newUsername }), canRegister(users))
  return router
}
