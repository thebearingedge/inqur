import { describe, beforeEach, afterEach, it } from 'mocha'
import jwt from 'jsonwebtoken'
import { fakeUser } from '../test/fixtures'
import { redis, expect, spy } from '../test/db'
import tokensData from './tokens-data'

describe('authorization/tokens-data', () => {

  let tokens

  beforeEach(() => {
    tokens = tokensData(redis)
  })

  describe('when the token has been issued', () => {

    beforeEach(() => spy(redis, 'existsAsync'))

    afterEach(() => redis.existsAsync.restore())

    it('returns the decoded user', async () => {
      const user = fakeUser()
      const token = jwt.sign(user, process.env.TOKEN_SECRET)
      await redis.setAsync(token, token)
      const authenticated = await tokens.verify(token)
      expect(authenticated).to.include(user)
      expect(redis.existsAsync).to.have.been.calledWith(token)
    })

  })

  describe('when the token is no longer stored', () => {

    it('returns null', async () => {
      const token = 'foo'
      const authenticated = await tokens.verify(token)
      expect(authenticated).to.equal(null)
    })

  })

  describe('when the token is invalid', () => {

    it('returns null', async () => {
      const token = 'foo'
      await redis.setAsync(token, token)
      const authenticated = await tokens.verify(token)
      expect(authenticated).to.equal(null)
    })

  })

})
