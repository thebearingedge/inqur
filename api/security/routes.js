import joi from 'joi'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import usersData from './users-data'
import tokensData from './tokens-data'
import { wrap, errors, validate } from '../util'

const credentials = joi.object().keys({
  username: joi.string().trim().required(),
  password: joi.string().trim().required()
})

export const authenticate = (users, tokens) =>
  wrap(async (req, res, next) => {
    const { username, password } = req.body
    const found = await users.findByUsername(username)
    if (!found) throw new errors.Unauthorized('Invalid Login')
    const { password: hashed, ...user } = found
    const match = await bcrypt.compare(password, hashed)
    if (!match) throw new errors.Unauthorized('Invalid Login')
    const token = await tokens.issue(user)
    res.status(201).json({ token, user })
  })

export default function routes(knex, redis) {
  const users = usersData(knex)
  const tokens = tokensData(redis)
  const router = new Router()
  router
    .route('/')
    .post(validate({ body: credentials }), authenticate(users, tokens))
  return router
}
