import { describe, beforeEach, it } from 'mocha'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import run from 'express-unit'
import { fakeUser } from '../test/fixtures'
import { expect, stub, spy } from '../test/unit'
import { Unauthorized } from '../util/errors'
import usersData from './users-data'
import tokensData from './tokens-data'
import * as routes from './routes'

describe('authentication/routes', () => {

  describe('authenticate', () => {

    let users
    let tokens
    let middleware

    beforeEach(() => {
      users = usersData()
      tokens = tokensData()
      middleware = routes.authenticate(users, tokens)
    })

    describe('when the user is not found', () => {
      const user = fakeUser()
      const setup = (req, res, next) => {
        req.body = user
        stub(users, 'find').resolves(null)
        next()
      }
      it('returns an Unauthorized error', async () => {
        const [ err, , res ] = await run(setup, middleware)
        expect(err).to.be.an.instanceOf(Unauthorized)
        expect(res.locals.user).to.equal(undefined)
      })
    })

    describe('when the user supplies an incorrect password', () => {
      const user = fakeUser()
      const setup = (req, res, next) => {
        req.body = user
        stub(users, 'find').resolves({ ...user, password: 'foo' })
        next()
      }
      it('returns an Unauthorized error', async () => {
        const [ err, , res ] = await run(setup, middleware)
        expect(err).to.be.an.instanceOf(Unauthorized)
        expect(res.locals.user).to.equal(undefined)
      })
    })

    describe('when the user supplies a correct password', () => {

      let user
      let setup
      let token

      beforeEach(async () => {
        const { password, ..._user } = fakeUser()
        const hashed = await bcrypt.hash(password, 10)
        user = _user
        token = jwt.sign(user, process.env.TOKEN_SECRET)
        setup = (req, res, next) => {
          req.body = { password, ...user }
          stub(users, 'find')
            .withArgs(user.username)
            .resolves({ ...user, password: hashed })
          stub(tokens, 'issue')
            .withArgs(user)
            .resolves(token)
          spy(res, 'status')
          spy(res, 'json')
          next()
        }
      })

      it('issues a JWT', async () => {
        const [ err, , res ] = await run(setup, middleware)
        expect(err).to.equal(null)
        expect(res.status).to.have.been.calledWith(201)
        expect(res.json).to.have.been.calledWith({ token, user })
      })
    })

  })

})
