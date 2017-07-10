import { describe, beforeEach, it } from 'mocha'
import bcrypt from 'bcrypt'
import { inject, request, expect } from '../test/integration'
import { fakeUser, User } from '../test/fixtures'

describe('authentication/routes', () => {

  let trx

  beforeEach(inject(({ _trx }) => {
    trx = _trx
  }))

  describe('POST /authenticate', () => {

    describe('when the user supplies invalid credentials', () => {
      it('returns a Bad Request error', async () => {
        const credentials = { username: 'foo' }
        const { data } = await request.post('/authenticate', credentials)
        expect(data).to.include({
          statusCode: 400,
          error: 'Bad Request'
        })
      })
    })

    describe('when the user supplies an incorrect username', () => {

      let credentials

      beforeEach(async () => {
        const { username, email, password: unhashed } = fakeUser()
        credentials = { username: username + 'wrong', password: unhashed }
        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(unhashed, salt)
        await trx
          .insert({ username, email, password })
          .into('users')
      })

      it('returns an Unauthorized error', async () => {
        const { data } = await request.post('/authenticate', credentials)
        expect(data).to.include({
          statusCode: 401,
          error: 'Unauthorized'
        })
      })

    })

    describe('when the user supplies an incorrect password', () => {

      let credentials

      beforeEach(async () => {
        const { username, email, password: unhashed } = fakeUser()
        credentials = { username, password: unhashed + 'wrong' }
        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(unhashed, salt)
        await trx
          .insert({ username, email, password })
          .into('users')
      })

      it('returns an Unauthorized error', async () => {
        const { data } = await request.post('/authenticate', credentials)
        expect(data).to.include({
          statusCode: 401,
          error: 'Unauthorized'
        })
      })

    })

    describe('when the user supplies correct credentials', () => {

      let credentials

      beforeEach(async () => {
        const { username, email, password: unhashed } = fakeUser()
        credentials = { username, password: unhashed }
        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(unhashed, salt)
        await trx
          .insert({ username, email, password })
          .into('users')
      })

      it('returns a token and user profile', async () => {
        const { data } = await request.post('/authenticate', credentials)
        expect(data).to.have.structure({
          user: User,
          token: String
        })
      })

    })

  })

})
