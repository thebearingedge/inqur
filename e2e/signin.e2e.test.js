import { describe, it } from 'mocha'
import bcrypt from 'bcrypt'
import { fakeUser, browser, baseUrl, knex, expect } from './__setup__'

describe('/signin', () => {

  it('is the auth redirect page', async () => {
    await browser
      .goto(baseUrl)
      .wait('form[name="signin"]')
  })

  it('lets a registered user sign in', async () => {
    const { username, email, password: unhashed } = fakeUser()
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(unhashed, salt)
    await knex
      .insert({ username, email, password })
      .into('users')
    await browser
      .goto(`${baseUrl}/signin`)
      .wait('form[name="signin"]')
      .type('[name="username"]', username)
      .type('[name="password"]', unhashed)
      .click('[type="submit"]')
      .wait('h1')
      .evaluate(() => document.querySelector('h1').textContent)
      .then(text => expect(text).to.equal(`Hello, ${username}!`))
  })

})
