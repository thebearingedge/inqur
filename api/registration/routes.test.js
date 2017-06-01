import { describe, beforeEach, it } from 'mocha'
import { expect } from 'chai'
import { stub, spy } from 'sinon'
import run from 'express-unit'
import { fakeUser } from './__fixtures__'
import usersData from './users.data'
import router, * as routes from './routes'

describe('registration/routes', () => {

  describe('router', () => {

    it('composes without error', () => {
      expect(() => router()).not.to.throw()
    })

  })

  describe('register', () => {

    let users
    let middleware

    beforeEach(() => {
      users = usersData()
      middleware = routes.register(users)
    })

    it('creates a new user', async () => {
      const user = fakeUser()
      const setup = (req, res, next) => {
        req.body = user
        stub(users, 'create')
        spy(res, 'status')
        spy(res, 'json')
        next()
      }
      const [ err, , res ] = await run(setup, middleware)
      expect(err).to.be.null
      expect(users.create).to.have.been.calledWith(user)
      expect(res.status).to.have.been.calledWith(201)
      expect(res.json).to.have.been.called
    })

  })

})
