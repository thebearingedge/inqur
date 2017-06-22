import { describe, beforeEach, afterEach, it } from 'mocha'
import bcrypt from 'bcrypt'
import { begin, expect } from '../test/db'
import { User, fakeUser } from '../test/fixtures'
import usersData from './users-data'

describe('registration/users-data', () => {

  let trx
  let users

  beforeEach(begin(_trx => {
    trx = _trx
    users = usersData(trx)
  }))

  afterEach(() => trx.rollback())

  describe('create', () => {
    it('inserts a user with an encrypted password', async () => {
      const user = fakeUser()
      const created = await users.create(user)
      expect(created).to.have.structure(User)
      const { password: hash } = await trx
        .select('password')
        .from('users')
        .where('username', user.username)
        .first()
      expect(hash).not.to.equal(user.password)
      const match = await bcrypt.compare(user.password, hash)
      expect(match).to.equal(true)
    })
  })

  describe('isAvailable', () => {
    it('returns whether a username is available', async () => {
      const user = fakeUser()
      const [{ username }] = await trx
        .insert(user)
        .into('users')
        .returning(['username'])
      const isAvailable = await users.isAvailable({ username })
      expect(isAvailable).to.equal(false)
    })
  })

})
