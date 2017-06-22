import { describe, beforeEach, it } from 'mocha'
import bcrypt from 'bcrypt'
import run from 'express-unit'
import { fakeUser } from '../test/fixtures'
import { expect, stub } from '../test/unit'
import { Unauthorized } from '../util/errors'
import usersData from './users-data'
import * as routes from './routes'

describe('security/routes', () => {

  describe('authenticate', () => {

    let users
    let middleware

    beforeEach(() => {
      users = usersData()
      middleware = routes.authenticate(users)
    })

    describe('when the user is not found', () => {
      const user = fakeUser()
      const setup = (req, res, next) => {
        req.body = user
        stub(users, 'findByUsername').resolves(null)
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
        stub(users, 'findByUsername').resolves({ ...user, password: 'foo' })
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

      beforeEach(async () => {
        user = fakeUser()
        const hashed = await bcrypt.hash(user.password, 10)
        setup = (req, res, next) => {
          req.body = user
          stub(users, 'findByUsername').resolves({
            ...user,
            password: hashed
          })
          next()
        }
      })

      it('sets the user on the response locals', async () => {
        const [ err, , res ] = await run(setup, middleware)
        expect(err).to.equal(null)
        expect(res.locals.user)
          .to.be.an('object')
          .and.to.have.keys(['username', 'email'])
          .and.not.have.property('password')
      })
    })

  })

})
