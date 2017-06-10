import { api } from '../core'
import { expect } from 'chai'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'

export const mockStore = configureStore([
  thunk.withExtraArgument({ api })
])

export const rejected = promise => promise.catch(err => err)

export { expect }
