import { combineReducers } from 'redux'
import * as types from './types'

export const signinError = (state = null, action) => {
  switch (action.type) {
    case types.SIGNIN_FAILED:
      return action.message
    case types.SIGNIN_VISITED:
      return null
    default:
      return state
  }
}

export default combineReducers({ signinError })
