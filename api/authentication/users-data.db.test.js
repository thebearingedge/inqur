import { describe, beforeEach, afterEach, it } from 'mocha'
import { expect, begin } from '../test/db'
import { fakeUser } from '../test/fixtures'
import usersData from './users-data'

describe('security/users-data', () => {

  let trx
  let users

  beforeEach(begin(_trx => {
    trx = _trx
    users = usersData(trx)
  }))

  afterEach(() => trx.rollback())

  describe('findByUsername', () => {

    describe('when a user exists', () => {

      let username

      beforeEach(async () => {
        const [{ username: _username }] = await trx
          .insert(fakeUser())
          .into('users')
          .returning('*')
        username = _username
      })

      it('returns the user', async () => {
        const user = await users.findByUsername(username)
        expect(user)
          .to.be.an('object')
          .and.not.equal(null)
      })

    })

    describe('when a user does not exist', () => {

      it('returns null', async () => {
        const { username } = fakeUser()
        const user = await users.findByUsername(username)
        expect(user).to.equal(null)
      })

    })

  })

})
