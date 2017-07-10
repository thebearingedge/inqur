import joi from 'joi'
import { Router } from 'express'
import pollsData from './polls-data'
import { wrap, validate } from '../util'
import { verify, tokensData } from '../authorization'

const newPoll = joi.object().keys({
  question: joi.string().trim().required(),
  options: joi.array().min(2).items(joi.object().keys({
    answer: joi.string().trim().required()
  })).required(),
  userId: joi.string().uuid({ version: ['uuidv4'] }).required()
})

export const createPoll = polls =>
  wrap(async ({ body }, res) => {
    const created = await polls.create(body)
    res.status(201).json(created)
  })

export default function routes(knex, redis) {
  const polls = pollsData(knex)
  const tokens = tokensData(redis)
  const router = new Router()
  router
    .route('/')
    .post(
      verify(tokens),
      validate({ body: newPoll }),
      createPoll(polls)
    )
  return router
}
