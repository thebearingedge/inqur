import { describe, beforeEach, afterEach, it } from 'mocha'
import { injectStore, expect, stub } from '../test/unit'
import { api } from '../core'
import * as actions from './actions'

describe('authentication/actions', () => {

  let store

  beforeEach(() => {
    store = injectStore({ api })()
  })

  describe('onSubmit', () => {

    beforeEach(() => stub(api, 'post'))

    afterEach(() => {
      api.post.restore()
      store.clearActions()
    })

    it('posts a set of user credentials', async () => {
      const credentials = { username: 'foo', password: 'bar' }
      api.post
        .withArgs('/authenticate', credentials)
        .resolves({ data: { user: { username: 'foo' }, token: 'bar' } })
      const result = await store.dispatch(actions.onSubmit(credentials))
      expect(result).to.deep.equal({ user: { username: 'foo' }, token: 'bar' })
      expect(store.getActions()).to.deep.equal([
        actions.signinSubmitted()
      ])
    })

  })

})
