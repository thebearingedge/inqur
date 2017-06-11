import { beforeEach, afterEach } from 'mocha'
import { JSDOM } from 'jsdom'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import { initStore } from '../core'

chai.use(sinonChai)
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

export const withStore = Component =>
  function Wrapped({ state, ...ownProps }) {
    return (
      <Provider store={ initStore(state) }>
        <Component { ...ownProps }/>
      </Provider>
    )
  }
