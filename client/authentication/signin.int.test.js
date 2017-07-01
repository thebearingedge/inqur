import { describe, beforeEach, afterEach, it } from 'mocha'
import React from 'react'
import moxios from 'moxios'
import Router from 'next/router'
import { withStore, expect, mount, stub } from '../test/integration'
import { api } from '../core'
import { FormError } from '../components'
import Signin from './signin'

describe('authentication/signin', () => {

  let store
  let wrapper

  beforeEach(() => {
    const provide = withStore({ api, Router })
    const { WithStore, store: _store } = provide(Signin)()
    store = _store
    wrapper = mount(<WithStore/>)
    moxios.install(api)
    stub(Router, 'push')
  })

  afterEach(() => {
    moxios.uninstall(api)
    Router.push.restore()
  })

  it('requires a username', () => {
    const username = wrapper
      .find('[name="username"]')
      .first()
    wrapper
      .find('[type="submit"]')
      .first()
      .simulate('submit')
    expect(username.parent()).to.have.text('Enter your username.')
    username.simulate('change', { target: { value: 'foo' } })
    expect(username.parent()).not.to.have.text('Enter your username.')
  })

  it('requires a password', () => {
    const password = wrapper
      .find('[name="password"]')
      .first()
    wrapper
      .find('[type="submit"]')
      .first()
      .simulate('submit')
    expect(password.parent()).to.have.text('Enter your password.')
    password.simulate('change', { target: { value: 'foo' } })
    expect(password.parent()).not.to.have.text('Enter your password.')
  })

  it('signs the user in and changes routes', done => {
    Router.push
      .withArgs('/')
      .callsFake(() => done())
    moxios.stubOnce('POST', '/authenticate', {
      status: 201,
      response: { user: { username: 'foo' }, token: 'token' }
    })
    wrapper
      .find('[name="username"]')
      .first()
      .simulate('change', { target: { value: 'foo' } })
    wrapper
      .find('[name="password"]')
      .first()
      .simulate('change', { target: { value: 'foo' } })
    wrapper.find('[type="submit"]').simulate('submit')
  })

  it.only('displays authentication failure errors', done => {
    moxios.stubOnce('POST', '/authenticate', {
      status: 401,
      response: { error: 'Invalid Login' }
    })
    store.subscribe(() => {
      const { authentication: { error } } = store.getState()
      if (!error) return
      setTimeout(() => {
        const formError = wrapper.find(FormError).first()
        expect(formError).to.have.text('foo')
        done()
      })
    })
    wrapper
      .find('[name="username"]')
      .first()
      .simulate('change', { target: { value: 'foo' } })
    wrapper
      .find('[name="password"]')
      .first()
      .simulate('change', { target: { value: 'foo' } })
    wrapper.find('[type="submit"]').simulate('submit')
  })

})
