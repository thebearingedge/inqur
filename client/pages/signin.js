import React from 'react'
import withRedux from 'next-redux-wrapper'

import { initStore } from '../core'
import { Login } from '../layouts'
import { Signin, mapDispatch } from '../authentication/signin'

const Page = props =>
  <Login title='Sign in'>
    <Signin { ...props }/>
  </Login>

export default withRedux(initStore(), null, mapDispatch)(Page)
