import { describe, beforeEach, it } from 'mocha'
import { injectStore, expect, spy } from '../test/unit'
import { sessionResumed } from './actions'
import withSession from './with-session'

describe('session/with-session', () => {

  let getProps
  let createStore

  beforeEach(() => {
    getProps = spy()
    createStore = injectStore({})
  })

  describe('on page load', () => {

    let ctx
    let store

    beforeEach(() => {
      store = createStore({ session: null })
      ctx = { store, req: { session: {} }, res: { redirect: spy() } }
    })

    describe('when the user has an active session', () => {

      it('dispatches a session resumption', async () => {
        ctx.req.session.user = {}
        await withSession(getProps)(ctx)
        expect(getProps.called).to.equal(true)
        expect(ctx.res.redirect.called).to.equal(false)
        expect(store.getActions()).to.deep.equal([
          sessionResumed(ctx.req.session.user)
        ])
      })

    })

  })

  describe('on page transition', () => {

    describe('when the user has an active session', () => {

      let ctx
      let store

      beforeEach(() => {
        const session = { username: 'foo' }
        store = createStore({ session })
        ctx = { store }
      })

      it('continues with the current session', async () => {
        await withSession(getProps)(ctx)
        expect(getProps).to.have.been.calledWith(ctx)
      })

    })

  })

})
