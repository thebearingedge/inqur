import { describe, beforeEach, afterEach, it } from 'mocha'
import { api } from '../core'
import moxios from 'moxios'
import { mockStore, expect, rejected } from '../test/unit'
import { asyncValidate } from './actions'

describe('registration/actions', () => {

  describe('asyncValidate', () => {

    const username = 'foo'
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
        moxios.stubOnce('GET', '/registration', { username })
        moxios.wait(() => {
          moxios.requests
            .mostRecent()
            .respondWith({
              status: 200,
              response: { username, isAvailable: false }
            })
        })
        const err = await rejected(store.dispatch(asyncValidate({ username })))
        expect(err).to.deep.equal({
          username: 'Sorry, that username is taken.'
        })
      })

    })

    describe('when a username is available', () => {

      it('resolves', async () => {
        moxios.stubOnce('GET', '/registration', { username })
        moxios.wait(() => {
          moxios.requests
            .mostRecent()
            .respondWith({
              status: 200,
              response: { username, isAvailable: true }
            })
        })
        const result = await store.dispatch(asyncValidate({ username }))
        expect(result).to.be.undefined
      })

    })

    describe('when no username is passed', () => {

      it('resolves without sending a request', async () => {
        moxios.stubOnce('GET', '/registration', { username })
        const result = await store.dispatch(asyncValidate({}))
        expect(result).to.be.undefined
      })

    })

  })

})
