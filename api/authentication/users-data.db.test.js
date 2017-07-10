import { describe, beforeEach, it } from 'mocha'
import { inject, expect } from '../test/db'
import { fakeUser } from '../test/fixtures'
import usersData from './users-data'

describe('authentication/users-data', () => {

  let trx
  let users

  beforeEach(inject(({ _trx }) => {
    trx = _trx
    users = usersData(trx)
  }))

  describe('find', () => {

    describe('when a user exists', () => {

      let email
      let username

      beforeEach(async () => {
        const [{ username: _username, email: _email }] = await trx
          .insert(fakeUser())
          .into('users')
          .returning('*')
        email = _email
        username = _username
      })

      it('finds the user by email', async () => {
        const user = await users.find(username)
        expect(user)
          .to.be.an('object')
          .and.not.equal(null)
      })

      it('finds the user by username', async () => {
        const user = await users.find(email)
        expect(user)
          .to.be.an('object')
          .and.not.equal(null)
      })

    })

    describe('when a user does not exist', () => {

      it('returns null', async () => {
        const { username } = fakeUser()
        const user = await users.find(username)
        expect(user).to.equal(null)
      })

    })

  })

})
