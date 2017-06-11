import withRedux from 'next-redux-wrapper'

import { initStore } from '../core'
import { Register, mapDispatch } from '../registration/register'

export default withRedux(initStore, null, mapDispatch)(Register)
