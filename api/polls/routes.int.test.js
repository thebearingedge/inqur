import { describe, beforeEach, afterEach, it } from 'mocha'
import { start, request, expect } from '../test/integration'
import { fakePoll, Poll } from '../test/fixtures'

describe('polls/routes', () => {

  let trx
  let token
  let server
  let userId

  beforeEach(start((_trx, _server, _userId, _token) => {
    trx = _trx
    token = _token
    server = _server
    userId = _userId
  }))

  afterEach(() => server.close(() => trx.rollback()))

  describe('POST /polls', () => {

    describe('when the user is not authenticated', () => {
      it('returns an Unauthorized error', async () => {
        const poll = fakePoll(userId)
        const { data } = await request.post('/polls', poll)
        expect(data).to.include({
          statusCode: 401,
          error: 'Unauthorized'
        })
      })
    })

    describe('when the user supplies an invalid poll', () => {
      it('returns a Bad Request error', async () => {
        const { options, ...poll } = fakePoll(userId)
        const { data } = await request.post('/polls', poll, {
          headers: { 'X-Access-Token': token }
        })
        expect(data).to.include({
          statusCode: 400,
          error: 'Bad Request'
        })
      })
    })

    describe('when the user supplies a valid poll', () => {
      it('returns the created poll', async () => {
        const poll = fakePoll(userId)
        const { data } = await request.post('/polls', poll, {
          headers: { 'X-Access-Token': token }
        })
        expect(data).to.have.structure(Poll)
      })
    })

  })

})
