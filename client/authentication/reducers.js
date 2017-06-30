import { combineReducers } from 'redux'
import * as types from './action-types'

export const error = (state = null, action) => {
  switch (action.type) {
    case types.SIGNIN_FAILED:
      return action.message
    case types.SIGNIN_SUBMITTED:
      return null
    default:
      return state
  }
}

export default combineReducers({ error })
