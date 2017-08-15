import { describe, beforeEach, it } from 'mocha'
import React from 'react'
import { fakeUser } from '../../api/test/fixtures'
import { withStore, expect, mount } from '../test/integration'
import Navbar from './navbar'
import NavLink from './nav-link'

describe('components/navbar', () => {

  describe('when the user has an active session', () => {

    let wrapper
    let username

    beforeEach(() => {
      const provide = withStore({})
      const { username: _username } = fakeUser()
      username = _username
      const session = { username }
      const Wrapper = provide(Navbar)({ session })
      wrapper = mount(<Wrapper/>)
    })

    it('displays their username', () => {
      const link = wrapper.find(NavLink).at(1)
      expect(link).to.have.text(username)
    })

  })

  describe('when the user does not have an active session', () => {

    let wrapper

    beforeEach(() => {
      const provide = withStore({})
      const Wrapper = provide(Navbar)({ session: null })
      wrapper = mount(<Wrapper/>)
    })

    it('displays a login link', () => {
      const link = wrapper.find(NavLink).at(1)
      expect(link).to.have.text('sign in')
    })

  })

})
