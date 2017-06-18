import { describe, it } from 'mocha'
import { browser, baseUrl } from './__setup__'

describe('/register', () => {

  it('accepts new users', async () => {
    await browser
      .goto(`${baseUrl}/register`)
      .type('[name="username"]', 'foo')
      .type('[name="email"]', 'foo@bar.baz')
      .type('[name="password"]', 'foo')
      .type('[name="retypePassword"]', 'foo')
      .click('[type="submit"]')
      .wait('h1')
  })

})
