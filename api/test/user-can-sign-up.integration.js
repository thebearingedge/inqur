import { describe, beforeEach, afterEach, it } from 'mocha'
import { expect } from 'chai'
import { start, request } from './__test__'
import { fakeUser, User } from '../registration/__fixtures__'

describe('User can sign up', () => {

  const endpoint = '/registration'

  let trx
  let server

  beforeEach(start((_trx, _server) => {
    trx = _trx
    server = _server
  }))

  afterEach(() => server.close(() => trx.rollback()))

  describe('when the user supplies an invalid profile', () => {
    it('returns a Bad Request error', async () => {
      const profile = { username: 'foo' }
      const { data } = await request.post(endpoint, profile)
      expect(data).to.include({
        statusCode: 400,
        error: 'Bad Request'
      })
    })
  })

  describe('when the user supplies a valid profile', () => {
    it('stores the new user', async () => {
      const profile = fakeUser()
      const { status, data } = await request.post(endpoint, profile)
      expect(status).to.equal(201)
      expect(data).to.have.structure(User)
    })
  })

})
