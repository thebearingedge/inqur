import React from 'react'
import withRedux from 'next-redux-wrapper'

import { initStore } from '../core'
import { Login } from '../layouts'
import { Register, mapDispatch } from '../registration/register'

const Page = props =>
  <Login title='Register'>
    <Register { ...props }/>
  </Login>

export default withRedux(initStore(), null, mapDispatch)(Page)
