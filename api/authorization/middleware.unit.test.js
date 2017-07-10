import { describe, beforeEach, it } from 'mocha'
import run from 'express-unit'
import { expect, stub } from '../test/unit'
import { fakeUser } from '../test/fixtures'
import { errors } from '../util'
import * as middleware from './middleware'
import tokensData from './tokens-data'

describe('authorization/middleware', () => {

  describe('verify', () => {

    let tokens
    let verify

    beforeEach(() => {
      tokens = tokensData()
      verify = middleware.verify(tokens)
    })

    describe('when no access token is present', () => {

      it('throws an Unauthorized error', async () => {
        const [ err ] = await run(null, verify)
        expect(err)
          .to.be.an.instanceOf(errors.Unauthorized)
          .with.property('message')
          .that.equals('Insufficient Permissions')
      })

    })

    describe('when an invalid token is present', () => {

      const setup = (req, res, next) => {
        req.headers['x-access-token'] = 'foo'
        stub(tokens, 'verify')
          .withArgs('foo')
          .resolves(null)
        next()
      }

      it('throws an Unauthorized error', async () => {
        const [ err ] = await run(setup, verify)
        expect(err)
          .to.be.an.instanceOf(errors.Unauthorized)
          .with.property('message')
          .that.equals('Insufficient Permissions')
      })

    })

    describe('when a valid token is present', () => {

      const { password, ...user } = fakeUser()
      const setup = (req, res, next) => {
        req.headers['x-access-token'] = 'foo'
        stub(tokens, 'verify')
          .withArgs('foo')
          .resolves(user)
        next()
      }

      it('sets the user on the request', async () => {
        const [ err, req ] = await run(setup, verify)
        expect(err).to.equal(null)
        expect(req)
          .to.have.property('user')
          .that.equals(user)
      })

    })

  })

})
