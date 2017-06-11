export const asyncValidate = ({ username }) =>
  async (dispatch, getState, { api }) => {
    if (!username) return
    const { data } = await api.get('/registration', { params: { username } })
    if (!data.isAvailable) {
      return Promise.reject({ username: `Sorry, that username is taken.` })
    }
  }

export const onSubmit = user =>
  async (dispatch, getState, { api }) => {
    const { data } = await api.post('/registration', user)
    return data
  }

export const onSubmitSuccess = () =>
  (dispatch, getState, { Router }) => {
    Router.push('/')
  }
