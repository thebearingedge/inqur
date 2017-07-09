import { describe, beforeEach, afterEach, it } from 'mocha'
import { redis, expect, spy } from '../test/db'
import jwt from 'jsonwebtoken'
import { fakeUser } from '../test/fixtures'
import tokensData from './tokens-data'

describe('authentication/tokens-data', () => {

  let tokens

  beforeEach(() => {
    tokens = tokensData(redis)
  })

  describe('issue', () => {

    beforeEach(() => spy(redis, 'psetexAsync'))

    afterEach(() => redis.psetexAsync.restore())

    it('stores an expiring JWT', async () => {
      const { username, email } = fakeUser()
      const token = await tokens.issue({ username, email })
      expect(redis.psetexAsync)
        .to.have.been.calledWith(token, process.env.TOKEN_EXPIRY, token)
      const user = jwt.verify(token, process.env.TOKEN_SECRET)
      expect(user).to.include({ username, email })
    })

  })

})
