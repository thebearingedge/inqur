import { sessionResumed } from './actions'

export default function withSession(getInitialProps = () => ({})) {
  return async ctx => {
    const { req, store } = ctx
    const { getState, dispatch } = store
    const { session } = getState()
    if (session || !req) return getInitialProps(ctx)
    const { user } = req.session
    if (user) dispatch(sessionResumed(user))
    return getInitialProps(ctx)
  }
}
