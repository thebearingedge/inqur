import { describe, beforeEach, afterEach, it } from 'mocha'
import React from 'react'
import moxios from 'moxios'
import Router from 'next/router'
import { withStore, expect, mount, stub, baseURL, nextTick } from '../test/integration'
import { api } from '../core'
import { FormError } from '../components'
import Signin from './signin'

describe('authentication/signin', () => {

  let wrapper

  beforeEach(() => {
    const provide = withStore({ api, Router })
    const Wrapper = provide(Signin)()
    wrapper = mount(<Wrapper/>)
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
    Router
      .push
      .withArgs('/')
      .callsFake(() => done())
    moxios.stubOnce('POST', `${baseURL}/authenticate`, {
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

  it('displays authentication failure errors', async () => {
    const authenticate = moxios.stubOnce('POST', `${baseURL}/authenticate`, {
      status: 401,
      response: { error: 'Invalid Login' }
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
    await authenticate
    await nextTick()
    const formError = wrapper.find(FormError).first()
    expect(formError).to.have.text('Your login information was incorrect.')
  })

})
