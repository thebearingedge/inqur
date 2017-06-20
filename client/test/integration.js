import { beforeEach, afterEach } from 'mocha'
import { JSDOM } from 'jsdom'
import { mount } from 'enzyme'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import { initStore } from '../core'
export * from './shared'

chai.use(chaiEnzyme())

beforeEach(() => {
  const { window } = new JSDOM()
  const { document, navigator } = window
  Object.assign(global, { window, document, navigator })
})

afterEach(() => {
  let window, document, navigator
  Object.assign(global, { window, document, navigator })
})

export const withStore = env => Component => state =>
  function Wrapped(props) {
    return (
      <Provider store={ initStore(env)(state) }>
        <Component { ...props }/>
      </Provider>
    )
  }

export { mount }
