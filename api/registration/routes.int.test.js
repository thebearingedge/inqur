import { describe, it } from 'mocha'
import { request, expect } from '../test/integration'
import { fakeUser, User } from '../test/fixtures'

describe('registration/routes', () => {

  describe('POST /registration', () => {

    describe('when the user supplies an invalid username', () => {
      it('returns a Bad Request error', async () => {
        const user = fakeUser()
        const profile = { ...user, username: `${user.username}_` }
        const { data } = await request.post('/registration', profile)
        expect(data).to.include({
          statusCode: 400,
          error: 'Bad Request'
        })
      })
    })

    describe('when the user supplies an invalid password', () => {
      it('returns a Bad Request error', async () => {
        const user = fakeUser()
        const profile = { ...user, password: user.password.slice(0, 5) }
        const { data } = await request.post('/registration', profile)
        expect(data).to.include({
          statusCode: 400,
          error: 'Bad Request'
        })
      })
    })

    describe('when the user supplies a valid profile', () => {
      it('stores the new user', async () => {
        const profile = fakeUser()
        const { status, data } = await request.post('/registration', profile)
        expect(status).to.equal(201)
        expect(data).to.have.structure(User)
      })
    })

  })

  describe('GET /registration', () => {

    describe('when the user supplies an invalid username', () => {
      it('returns a Bad Request error', async () => {
        const { data } = await request.get('/registration')
        expect(data).to.include({
          statusCode: 400,
          error: 'Bad Request'
        })
      })
    })

    describe('when the user supplies a valid username', () => {
      it('returns whether the username is available', async () => {
        const { username } = fakeUser()
        const { data } = await request.get('/registration', {
          params: { username }
        })
        expect(data).to.deep.equal({
          username,
          isAvailable: true
        })
      })
    })

  })

})
