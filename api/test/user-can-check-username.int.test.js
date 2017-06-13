import { describe, beforeEach, afterEach, it } from 'mocha'
import { expect } from 'chai'
import { start, request } from './__test__'
import { fakeUser } from '../registration/__fixtures__'

describe('User can check username', () => {

  const endpoint = '/registration'

  let trx
  let server

  beforeEach(start((_trx, _server) => {
    trx = _trx
    server = _server
  }))

  afterEach(() => server.close(() => trx.rollback()))

  describe('when the user supplies an invalid username', () => {
    it('returns a Bad Request error', async () => {
      const { data } = await request.get(endpoint)
      expect(data).to.include({
        statusCode: 400,
        error: 'Bad Request'
      })
    })
  })

  describe('when the user supplies a valid username', () => {
    it('returns whether the username is available', async () => {
      const { username } = fakeUser()
      const { data } = await request.get(endpoint, { params: { username } })
      expect(data).to.deep.equal({
        username,
        isAvailable: true
      })
    })
  })

})
