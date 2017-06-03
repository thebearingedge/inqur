import { describe, it } from 'mocha'
import { expect } from 'chai'
import createApp from './create-app'

describe('createApp', () => {

  it('composes an express app without crashing', () => {
    expect(createApp).not.to.throw()
  })

})
