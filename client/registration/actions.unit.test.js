import { describe, beforeEach, afterEach, it } from 'mocha'
import { api } from '../core'
import moxios from 'moxios'
import { mockStore, expect, rejected } from '../test/unit'
import { asyncValidate, onSubmit } from './actions'

describe('registration/actions', () => {

  describe('asyncValidate', () => {

    let store

    beforeEach(() => {
      store = mockStore()
      moxios.install(api)
    })

    afterEach(() => {
      moxios.uninstall(api)
    })

    describe('when a username is not available', () => {

      it('rejects with a validation error', async () => {
        moxios.wait(() => {
          const req = moxios.requests.get('GET', '/registration?username=foo')
          req.respondWith({
            status: 200,
            response: { username: 'foo', isAvailable: false }
          })
        })
        const err = await rejected(store.dispatch(asyncValidate({ username: 'foo' })))
        expect(err).to.deep.equal({
          username: 'Sorry, that username is taken.'
        })
      })

    })

    describe('when a username is available', () => {

      it('resolves', async () => {
        moxios.wait(() => {
          const req = moxios.requests.get('GET', '/registration?username=foo')
          req.respondWith({
            status: 200,
            response: { username: 'foo', isAvailable: true }
          })
        })
        const result = await store.dispatch(asyncValidate({ username: 'foo' }))
        expect(result).to.be.undefined
      })

    })

    describe('when no username is passed', () => {

      it('resolves without sending a request', async () => {
        const result = await store.dispatch(asyncValidate({}))
        expect(result).to.be.undefined
      })

    })

  })

  describe('onSubmit', () => {

    let store

    beforeEach(() => {
      store = mockStore()
      moxios.install(api)
    })

    afterEach(() => {
      moxios.uninstall(api)
    })

    it('posts a new user', async () => {
      moxios.wait(async () => {
        const req = moxios.requests.get('POST', '/registration')
        expect(JSON.parse(req.config.data)).to.deep.equal({ username: 'foo' })
        req.respondWith({ status: 201, response: { username: 'foo' } })
      })
      const user = await store.dispatch(onSubmit({ username: 'foo' }))
      expect(user).to.deep.equal({ username: 'foo' })
    })
  })

})
