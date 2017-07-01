import * as types from './action-types'

export const signinSubmitted = () => ({
  type: types.SIGNIN_SUBMITTED
})

export const onSubmit = credentials =>
  async (dispatch, getState, { api }) => {
    dispatch(signinSubmitted())
    const { data } = await api.post('/authenticate', credentials)
    return data
  }

export const onSubmitSuccess = () =>
  (dispatch, getState, { Router }) => {
    Router.push('/')
  }

export const signinFailed = message => ({
  type: types.SIGNIN_FAILED,
  message
})

export const onSubmitFail = (errors, dispatch, submitError) => {
  if (!submitError) return
  if (submitError.response && submitError.response.status === 401) {
    dispatch(signinFailed('Your login information was incorrect.'))
    return
  }
  dispatch(signinFailed('An unexpected error occurred.'))
}
