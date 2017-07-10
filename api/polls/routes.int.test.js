import { describe, beforeEach, it } from 'mocha'
import { inject, request, expect } from '../test/integration'
import { fakePoll, Poll } from '../test/fixtures'

describe('polls/routes', () => {

  let token
  let userId

  beforeEach(inject(({ _token, _userId }) => {
    token = _token
    userId = _userId
  }))

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
