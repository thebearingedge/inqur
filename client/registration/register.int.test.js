import React from 'react'
import { describe, beforeEach, afterEach, it } from 'mocha'
import { expect } from 'chai'
import { stub } from 'sinon'
import moxios from 'moxios'
import Router from 'next/router'
import { api } from '../core'
import { Register } from './register'
import { mount } from 'enzyme'
import { withStore } from '../test/integration'

describe('registration', () => {

  const Connected = withStore(Register)
  let wrapper

  beforeEach(() => {
    wrapper = mount(<Connected/>)
    moxios.install(api)
    stub(Router, 'push')
  })

  afterEach(() => {
    moxios.uninstall(api)
    Router.push.restore()
  })

  it('checks for the availability of a username', async () => {
    wrapper
      .find('[name="username"]')
      .first()
      .simulate('change', { target: { value: 'foo' } })
    await moxios.stubOnce('GET', '/registration?username=foo', {
      status: 200,
      response: { username: 'foo', isAvailable: true }
    })
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
    Router.push
      .withArgs('/')
      .callsFake(() => done())
    moxios.stubRequest('/registration?username=foo', {
      status: 200,
      response: { username: 'foo', isAvailable: true }
    })
    moxios.stubOnce('POST', '/registration', {
      status: 201,
      response: { username: 'foo' }
    })
    wrapper
      .find('[name="username"]')
      .first()
      .simulate('change', { target: { value: 'foo' } })
    wrapper
      .find('[name="email"]')
      .first()
      .simulate('change', { target: { value: 'foo@bar.baz' } })
    wrapper
      .find('[name="password"]')
      .first()
      .simulate('change', { target: { value: 'foo' } })
    wrapper
      .find('[name="retypePassword"]')
      .first()
      .simulate('change', { target: { value: 'foo' } })
    wrapper.find('[type="submit"]').simulate('submit')
  })

})
