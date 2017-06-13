import { describe, beforeEach, afterEach, it } from 'mocha'
import { injectStore, expect, stub, rejected } from '../test/unit'
import { api } from '../core'
import { asyncValidate, onSubmit } from './actions'

describe('registration/actions', () => {

  let store

  beforeEach(() => {
    store = injectStore({ api })()
  })

  describe('asyncValidate', () => {

    beforeEach(() => stub(api, 'get'))

    afterEach(() => api.get.restore())

    describe('when a username is not available', () => {

      it('rejects with a validation error', async () => {
        api.get.resolves({ data: { username: 'foo', isAvailable: false } })
        const err = await rejected(store.dispatch(asyncValidate({ username: 'foo' })))
        expect(err).to.include({
          username: 'Sorry, that username is taken.'
        })
        expect(api.get).to.have.been.calledWith('/registration', {
          params: { username: 'foo' }
        })
      })

    })

    describe('when a username is available', () => {

      it('resolves', async () => {
        api.get.resolves({ data: { username: 'foo', isAvailable: true } })
        const result = await store.dispatch(asyncValidate({ username: 'foo' }))
        expect(result).to.equal(undefined)
        expect(api.get).to.have.been.calledWith('/registration', {
          params: { username: 'foo' }
        })
      })

    })

    describe('when no username is passed', () => {

      it('resolves without sending a request', async () => {
        const result = await store.dispatch(asyncValidate({}))
        expect(result).to.equal(undefined)
      })

    })

  })

  describe('onSubmit', () => {

    beforeEach(() => stub(api, 'post'))

    afterEach(() => api.post.restore())

    it('posts a new user', async () => {
      api.post.resolves({ data: { username: 'foo' } })
      const user = await store.dispatch(onSubmit({ username: 'foo' }))
      expect(user).to.deep.equal({ username: 'foo' })
      expect(api.post).to.have.been.calledWith('/registration', {
        username: 'foo'
      })
    })

  })

})
