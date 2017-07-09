import { describe, beforeEach, it } from 'mocha'
import run from 'express-unit'
import { fakePoll } from '../test/fixtures'
import { expect, stub, spy } from '../test/unit'

import pollsData from './polls-data'
import * as routes from './routes'

describe('polls/routes', () => {

  let polls
  let middleware

  beforeEach(() => {
    polls = pollsData()
    middleware = routes.createPoll(polls)
  })

  it('creates a poll', async () => {
    const poll = fakePoll()
    const setup = (req, res, next) => {
      req.body = poll
      stub(polls, 'create')
        .withArgs(poll)
        .resolves(poll)
      spy(res, 'status')
      spy(res, 'json')
      next()
    }
    const [ err, , res ] = await run(setup, middleware)
    expect(err).to.equal(null)
    expect(res.status).to.have.been.calledWith(201)
    expect(res.json).to.have.been.calledWith(poll)
  })

})
