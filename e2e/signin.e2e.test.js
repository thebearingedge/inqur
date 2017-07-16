import { describe, it } from 'mocha'
import bcrypt from 'bcrypt'
import { fakeUser, browser, baseUrl, knex, expect } from './__setup__'

describe('/signin', () => {

  it('is the auth redirect page', async () => {
    await browser
      .url(baseUrl)
      .waitForExist('form[name="signin"]')
  })

  it('lets a registered user sign in', async () => {
    const { username, email, password: unhashed } = fakeUser()
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(unhashed, salt)
    await knex
      .insert({ username, email, password })
      .into('users')
    await browser
      .url(`${baseUrl}/signin`)
      .waitForExist('form[name="signin"]')
      .setValue('[name="username"]', username)
      .setValue('[name="password"]', unhashed)
      .click('[type="submit"]')
      .waitForExist('h1')
    const greeting = await browser.getText('h1')
    expect(greeting).to.equal(`Hello, ${username}!`)
  })

})
