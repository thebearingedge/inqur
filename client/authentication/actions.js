import * as types from './types'
import { sessionStarted } from '../session/actions'

export const onSubmit = credentials =>
  async (dispatch, getState, { api }) => {
    const { data } = await api.post('/authenticate', credentials)
    return data
  }

export const onSubmitSuccess = ({ user }) =>
  (dispatch, getState, { Router }) => {
    dispatch(sessionStarted(user))
    Router.push('/')
  }

export const signinFailed = message => ({
  type: types.SIGNIN_FAILED,
  message
})

export const onSubmitFail = (errors, dispatch, submitError) =>
  dispatch => {
    if (!submitError) return
    if (submitError.response && submitError.response.status === 401) {
      dispatch(signinFailed('Your login information was incorrect.'))
      return
    }
    dispatch(signinFailed('An unexpected error occurred.'))
  }

export const signinVisited = () => ({
  type: types.SIGNIN_VISITED
})
