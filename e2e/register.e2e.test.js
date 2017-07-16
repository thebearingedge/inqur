import { describe, it } from 'mocha'
import { fakeUser, browser } from './__setup__'

describe('/register', () => {

  const { username, email, password } = fakeUser()

  it('accepts new users', async () => {
    await browser
      .url('/register')
      .waitForExist('form[name="register"]')
      .setValue('[name="username"]', username)
      .setValue('[name="email"]', email)
      .setValue('[name="password"]', password)
      .setValue('[name="retypePassword"]', password)
      .click('[type="submit"]')
      .waitForExist('form[name="signin"]')
  })

})
