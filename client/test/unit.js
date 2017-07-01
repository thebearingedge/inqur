import thunk from 'redux-thunk'
import sinonChai from 'sinon-chai'
import chai from 'chai'
import configureStore from 'redux-mock-store'
export * from './shared'

process.env.NODE_ENV = 'test'

chai.use(sinonChai)

export const injectStore = (env = {}) => configureStore([
  thunk.withExtraArgument(env)
])

export const rejected = promise => promise.catch(err => err)

export const INIT = '@@redux/INIT'
