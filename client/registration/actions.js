export const asyncValidate = ({ username }) =>
  async (dispatch, getState, { api }) => {
    if (!username) return
    const { data } = await api.get('/registration', { params: { username } })
    if (!data.isAvailable) {
      const err = { ...new Error(), username: 'Sorry, that username is taken.' }
      return Promise.reject(err)
    }
  }

export const onSubmit = user =>
  async (dispatch, getState, { api }) => {
    const { data } = await api.post('/registration', user)
    return data
  }

export const onSubmitSuccess = () =>
  (dispatch, getState, { Router }) => {
    Router.push('/signin')
  }
