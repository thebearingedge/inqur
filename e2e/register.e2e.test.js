import { describe, it } from 'mocha'
import { fakeUser, browser, baseUrl } from './__setup__'

describe('/register', () => {

  const { username, email, password } = fakeUser()

  it('accepts new users', async () => {
    await browser
      .goto(`${baseUrl}/register`)
      .wait('form[name="register"]')
      .type('[name="username"]', username)
      .type('[name="email"]', email)
      .type('[name="password"]', password)
      .type('[name="retypePassword"]', password)
      .click('[type="submit"]')
      .wait('form[name="signin"]')
  })

})
