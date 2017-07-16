import * as types from './types'

export default function session(state = null, action) {
  switch (action.type) {
    case types.SESSION_STARTED:
      return action.session
    default:
      return state
  }
}
