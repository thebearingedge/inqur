import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'

const injectStore = (env = {}) => configureStore([
  thunk.withExtraArgument(env)
])

const rejected = promise => promise.catch(err => err)

const INIT = '@@redux/INIT'

export * from './shared'
export { injectStore, rejected, INIT }
