import { describe, it } from 'mocha'
import bcrypt from 'bcrypt'
import { fakeUser, browser, knex, expect } from './__setup__'

describe('/signin', () => {

  it('does not sign in unregistered users', async () => {
    const { username, password } = fakeUser()
    await browser
      .url('/signin')
      .waitForExist('form[name="signin"]')
      .setValue('[name="username"]', username)
      .setValue('[name="password"]', password)
      .click('[type="submit"]')
      .waitForExist('.form-error')
  })

  it('signs in registered users', async () => {
    const { username, email, password: unhashed } = fakeUser()
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(unhashed, salt)
    await knex
      .insert({ username, email, password })
      .into('users')
    await browser
      .url('/signin')
      .waitForExist('form[name="signin"]')
      .setValue('[name="username"]', username)
      .setValue('[name="password"]', unhashed)
      .click('[type="submit"]')
      .waitForExist('nav')
    let navText = await browser.getText('nav')
    expect(navText).to.include(username)
    await browser
      .refresh()
      .waitForExist('nav')
    navText = await browser.getText('nav')
    expect(navText).to.include(username)
  })

})
