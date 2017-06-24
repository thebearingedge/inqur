import { describe, it } from 'mocha'
import { expect } from '../test/shared'
import initStore from './init-store'

describe('core/init-store', () => {

  it('composes without error', () => {
    expect(initStore()).not.to.throw()
  })

})
