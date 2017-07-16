import { describe, beforeEach, afterEach, it } from 'mocha'
import Router from 'next/router'
import { injectStore, expect, stub, spy } from '../test/unit'
import { sessionResumed } from './actions'
import withSession from './with-session'

describe('session/with-session', () => {

  let getProps
  let createStore

  beforeEach(() => {
    getProps = spy()
    createStore = injectStore({ Router })
    stub(Router, 'replace')
  })

  afterEach(() => Router.replace.restore())

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

    describe('when the user does not have an active session', () => {

      it('redirects the user to the signin page', async () => {
        ctx.res.redirect = spy()
        const result = await withSession()(ctx)
        expect(result).to.deep.equal({})
        expect(ctx.res.redirect).to.have.been.calledWith(302, '/signin')
        expect(store.getActions()).to.deep.equal([])
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
        expect(Router.replace.called).to.equal(false)
      })

    })

    describe('when the user does not have an active session', () => {

      let ctx
      let store

      beforeEach(() => {
        const session = null
        store = createStore({ session })
        ctx = { store }
      })

      it('redirects the user to the signin page', async () => {
        const result = await withSession()(ctx)
        expect(result).to.deep.equal({})
        expect(getProps).not.to.have.been.calledWith(ctx)
        expect(Router.replace)
          .to.have.been.calledWith('/signin')
      })

    })

  })

})
