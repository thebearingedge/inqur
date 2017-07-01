import { describe, beforeEach, afterEach, it } from 'mocha'
import { injectStore, expect, stub } from '../test/unit'
import { api } from '../core'
import * as types from './action-types'
import * as actions from './actions'

describe('authentication/actions', () => {

  let store

  beforeEach(() => {
    store = injectStore({ api })()
  })

  describe('signinVisited', () => {

    it('returns an action', () => {
      expect(actions.signinVisited())
        .to.be.an('object')
        .with.property('type', types.SIGNIN_VISITED)
    })

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
    })

  })

  describe('onSubmitFail', () => {

    afterEach(() => store.clearActions())

    describe('when authentication fails', () => {
      it('dispatches a login failure action', () => {
        const submitError = { ...new Error(), response: { status: 401 } }
        store.dispatch(actions.onSubmitFail({}, store.dispatch, submitError))
        expect(store.getActions()).to.deep.equal([
          actions.signinFailed('Your login information was incorrect.')
        ])
      })
    })

    describe('when a different error occurs', () => {
      it('dispatches a general failure action', () => {
        const submitError = new Error('An unexpected error occurred.')
        store.dispatch(actions.onSubmitFail({}, store.dispatch, submitError))
        expect(store.getActions()).to.deep.equal([
          actions.signinFailed(submitError.message)
        ])
      })
    })

  })

})
