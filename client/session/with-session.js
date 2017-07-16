import { sessionResumed } from './actions'

const pass = () => ({})

export default function withSession(getInitialProps = pass) {
  return async ctx => {
    const { req, res, store } = ctx
    const { getState, dispatch } = store
    const { session } = getState()
    const signin = `/signin`
    if (session) return getInitialProps(ctx)
    if (!req) {
      dispatch((_, __, { Router }) => Router.replace(signin))
      return pass()
    }
    const { user } = req.session
    if (user) {
      dispatch(sessionResumed(user))
      return getInitialProps(ctx)
    }
    else {
      res.redirect(302, signin)
      return pass()
    }
  }
}
