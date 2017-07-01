import React from 'react'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'

import { initStore } from '../core'
import { Login } from '../layouts'
import { Signin, mapState, mapDispatch } from '../authentication/signin'
import { signinVisited } from '../authentication/actions'

const Page = props =>
  <Login title='Sign in'>
    <Head>
      <title>Sign In - Inqur</title>
    </Head>
    <Signin { ...props }/>
  </Login>

Page.getInitialProps = ({ store }) => store.dispatch(signinVisited())

export default withRedux(initStore(), mapState, mapDispatch)(Page)
