import React from 'react'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'

import { initStore } from '../core'
import { Login } from '../layouts'
import { Register, mapDispatch } from '../registration/register'

const Page = props =>
  <Login title='Register'>
    <Head>
      <title>Register - Inqur</title>
    </Head>
    <Register { ...props }/>
  </Login>

export default withRedux(initStore(), null, mapDispatch)(Page)
