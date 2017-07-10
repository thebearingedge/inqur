import { describe, beforeEach, it } from 'mocha'
import bcrypt from 'bcrypt'
import { fakeUser, browser, baseUrl, knex } from './__setup__'

describe('/signin', () => {

  const { username, email, password: unhashed } = fakeUser()

  beforeEach(async () => {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(unhashed, salt)
    await knex
      .insert({ username, email, password })
      .into('users')
  })

  it('lets a registered user sign in', async () => {
    await browser
      .goto(`${baseUrl}/signin`)
      .type('[name="username"]', username)
      .type('[name="password"]', unhashed)
      .click('[type="submit"]')
      .wait('h1')
  })

})
