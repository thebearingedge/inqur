import { before } from 'mocha'
import { grey } from 'chalk'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'

before(() => console.log(grey('\n  Client Unit Tests\n')))

const injectStore = (env = {}) => configureStore([
  thunk.withExtraArgument(env)
])

const rejected = promise => promise.catch(err => err)

const INIT = '@@redux/INIT'

export * from './shared'
export { injectStore, rejected, INIT }
