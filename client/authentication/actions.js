export const onSubmit = credentials =>
  async (dispatch, getState, { api }) => {
    const { data } = await api.post('/authenticate', credentials)
    return data
  }

export const onSubmitSuccess = () =>
  (dispatch, getState, { Router }) => {
    Router.push('/')
  }
