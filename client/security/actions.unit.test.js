import { describe, beforeEach, afterEach, it } from 'mocha'
import { injectStore, expect, stub } from '../test/unit'
import { api } from '../core'
import { onSubmit } from './actions'

describe('security/actions', () => {

  let store

  beforeEach(() => {
    store = injectStore({ api })()
  })

  describe('onSubmit', () => {

    beforeEach(() => stub(api, 'post'))

    afterEach(() => api.post.restore())

    it('posts a set of user credentials', async () => {
      const credentials = { username: 'foo', password: 'bar' }
      api.post
        .withArgs('/authenticate', credentials)
        .resolves({ data: { user: { username: 'foo' }, token: 'bar' } })
      const result = await store.dispatch(onSubmit(credentials))
      expect(result).to.deep.equal({ user: { username: 'foo' }, token: 'bar' })
    })

  })

})
