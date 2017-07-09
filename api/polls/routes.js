import { wrap } from '../util'

export const createPoll = polls =>
  wrap(async ({ body }, res) => {
    const created = await polls.create(body)
    res.status(201).json(created)
  })
