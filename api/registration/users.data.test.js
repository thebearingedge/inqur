import { describe, beforeEach, afterEach, it } from 'mocha'
import { expect } from 'chai'
import bcrypt from 'bcrypt'
import { begin } from '../__test__'
import { User, fakeUser } from './__fixtures__'
import usersData from './users.data'

describe('users.data', () => {

  let trx
  let users

  beforeEach(begin(_trx => {
    trx = _trx
    users = usersData(trx)
  }))

  afterEach(() => trx.rollback())

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
    expect(match).to.be.true
  })

})
