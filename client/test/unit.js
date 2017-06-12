import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'

chai.use(sinonChai)

export const injectStore = (env = {}) => configureStore([
  thunk.withExtraArgument(env)
])

export const rejected = promise => promise.catch(err => err)

export { expect }
