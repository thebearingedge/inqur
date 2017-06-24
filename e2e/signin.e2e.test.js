import { describe, it } from 'mocha'
import { fakeUser, browser, baseUrl } from './__setup__'

describe('/signin', () => {

  const { username, email, password } = fakeUser()

  it('lets a registered user sign in', async () => {
    await browser
      .goto(`${baseUrl}/register`)
      .type('[name="username"]', username)
      .type('[name="email"]', email)
      .type('[name="password"]', password)
      .type('[name="retypePassword"]', password)
      .click('[type="submit"]')
      .wait('h1')
    await browser
      .goto(`${baseUrl}/signin`)
      .type('[name="username"]', username)
      .type('[name="password"]', password)
      .click('[type="submit"]')
      .wait('h1')
  })

})
