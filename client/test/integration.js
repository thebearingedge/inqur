import { before, beforeEach, afterEach } from 'mocha'
import { JSDOM } from 'jsdom'
import { mount } from 'enzyme'
import chai from 'chai'
import React from 'react'
import { grey } from 'chalk'
import chaiEnzyme from 'chai-enzyme'
import { Provider } from 'react-redux'
import { initStore } from '../core'

chai.use(chaiEnzyme())

before(() => console.log(grey('\n  Client Integration Tests\n')))

beforeEach(() => {
  const { window } = new JSDOM()
  const { document, navigator } = window
  Object.assign(global, { window, document, navigator })
})

afterEach(() => {
  let window, document, navigator
  Object.assign(global, { window, document, navigator })
})

const withStore = env => Component => initialState => {
  const store = initStore(env)(initialState)
  return function WithStore(ownProps) {
    return (
      <Provider store={ store }>
        <Component { ...ownProps }/>
      </Provider>
    )
  }
}

const nextTick = fn => new Promise(resolve => {
  fn ? resolve(process.nextTick(fn)) : process.nextTick(resolve)
})

const { API_URL: baseURL } = process.env

export * from './shared'
export { mount, withStore, nextTick, baseURL }
