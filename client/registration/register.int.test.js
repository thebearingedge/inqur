import { describe, beforeEach, afterEach, it } from 'mocha'
import React from 'react'
import moxios from 'moxios'
import Router from 'next/router'
import { fakeUser } from '../../api/test/fixtures'
import { withStore, expect, mount, stub, baseURL } from '../test/integration'
import { api } from '../core'
import Register from './register'

describe('registration/register', () => {

  let wrapper

  beforeEach(() => {
    const provide = withStore({ api, Router })
    const Wrapper = provide(Register)()
    wrapper = mount(<Wrapper/>)
    moxios.install(api)
    stub(Router, 'push')
  })

  afterEach(() => {
    moxios.uninstall(api)
    Router.push.restore()
  })

  it('checks for the availability of a username', async () => {
    const validated = moxios.stubOnce('GET', `${baseURL}/registration?username=foo`, {
      status: 200,
      response: { username: 'foo', isAvailable: true }
    })
    wrapper
      .find('[name="username"]')
      .first()
      .simulate('change', { target: { value: 'foo' } })
    await validated
  })

  it('requires a valid username', () => {
    const username = wrapper
      .find('[name="username"]')
      .first()
    username.simulate('change', { target: { value: 'foo' } })
    expect(username.parent()).to.have.text('Your username must be at least 4 characters long.')
    username.simulate('change', { target: { value: 'foo_' } })
    expect(username.parent()).to.have.text('Usernames can only contain letters and numbers.')
    username.simulate('change', { target: { value: Array(64).fill('x').join('') } })
    expect(username.parent()).to.have.text('Usernames cannot be more than 63 characters.')
  })

  it('requires a valid email', () => {
    const email = wrapper
      .find('[name="email"]')
      .first()
    email.simulate('change', { target: { value: 'foo' } })
    expect(email.parent()).to.have.text('A valid email is required.')
    email.simulate('change', { target: { value: 'foo@bar.baz' } })
    expect(email.parent()).not.to.have.text('A valid email is required.')
  })

  it('requires a valid password', () => {
    const password = wrapper
      .find('[name="password"]')
      .first()
    password.simulate('change', { target: { value: 'foo' } })
    expect(password.parent()).to.have.text('Password must be at least 6 characters.')
    password.simulate('change', { target: { value: 'foo bar' } })
    expect(password.parent()).to.have.text('What do you want your password to be?')
  })

  it('requires matching passwords', () => {
    const password = wrapper
      .find('[name="password"]')
      .first()
    const retypePassword = wrapper
      .find('[name="retypePassword"]')
    password.simulate('change', { target: { value: 'foo' } })
    retypePassword.simulate('change', { target: { value: 'bar' } })
    expect(retypePassword.parent()).to.have.text('Passwords must match.')
    retypePassword.simulate('change', { target: { value: 'foo' } })
    expect(retypePassword.parent()).not.to.have.text('Passwords must match.')
  })

  it('registers a user and changes routes', done => {
    const { username, email, password } = fakeUser()
    Router.push
      .withArgs('/signin')
      .callsFake(() => done())
    moxios.stubRequest(`${baseURL}/registration?username=${username}`, {
      status: 200,
      response: { username, isAvailable: true }
    })
    moxios.stubOnce('POST', `${baseURL}/registration`, {
      status: 201,
      response: { username, email }
    })
    wrapper
      .find('[name="username"]')
      .first()
      .simulate('change', { target: { value: username } })
    wrapper
      .find('[name="email"]')
      .first()
      .simulate('change', { target: { value: email } })
    wrapper
      .find('[name="password"]')
      .first()
      .simulate('change', { target: { value: password } })
    wrapper
      .find('[name="retypePassword"]')
      .first()
      .simulate('change', { target: { value: password } })
    wrapper.find('[type="submit"]').simulate('submit')
  })

})
