import * as types from './types'

export const sessionStarted = session => ({
  type: types.SESSION_STARTED,
  session
})

export const sessionResumed = session => ({
  type: types.SESSION_RESUMED,
  session
})
