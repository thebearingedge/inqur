import React from 'react'
import Head from 'next/head'
import withStore from 'next-redux-wrapper'
import { initStore } from '../core'
import withSession from '../session/with-session'

const Home = ({ user }) =>
  <div>
    <Head>
      <title>Inqur: The most awesome polls on the Internet</title>
    </Head>
    <h1>Hello, { user ? user.username : 'World' }!</h1>
  </div>

Home.getInitialProps = withSession()

const mapState = ({ session: user }) => ({ user })

export default withStore(initStore(), mapState)(Home)
