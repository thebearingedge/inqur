export const onSubmit = credentials =>
  async (dispatch, getState, { api }) => {
    const { data } = await api.post('/authenticate', credentials)
    return data
  }
