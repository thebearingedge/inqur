import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
export * from './shared'

export const injectStore = (env = {}) => configureStore([
  thunk.withExtraArgument(env)
])

export const rejected = promise => promise.catch(err => err)

export const INIT = '@@redux/INIT'
