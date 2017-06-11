import React from 'react'
import { describe, beforeEach, afterEach, it } from 'mocha'
import { expect } from 'chai'
import { stub } from 'sinon'
import { api } from '../core'
import { Register } from './register'
import { mount } from 'enzyme'
import { withStore } from '../test/integration'

describe('registration', () => {

  const Connected = withStore(Register)
  let wrapper

  beforeEach(() => {
    wrapper = mount(<Connected/>)
  })

  beforeEach(() => {
    stub(api, 'get')
    stub(api, 'post')
  })

  afterEach(() => {
    api.get.restore()
    api.post.restore()
  })

  it('checks for the availability of a username', done => {
    api.get
      .withArgs('/registration', { params: { username: 'foo' } })
      .callsFake(() => {
        done()
        return { data: { username: 'foo', isAvailable: true } }
      })
    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { value: 'foo' } })
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

  it('registers a user', done => {
    api.get
      .withArgs('/registration', { params: { username: 'foo' } })
      .resolves({ data: { username: 'foo', isAvailable: true } })
    api.post
      .withArgs('/registration', {
        username: 'foo',
        email: 'foo@bar.baz',
        password: 'foo',
        retypePassword: 'foo'
      })
      .callsFake(() => {
        done()
        return { data: { username: 'foo' } }
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
    wrapper.find('button').simulate('submit')
  })

})
