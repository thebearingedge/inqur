import React from 'react'
import withStore from 'next-redux-wrapper'
import App from '../layouts/app'
import { initStore } from '../core'
import withSession from '../session/with-session'

const Index = () => <App/>

Index.getInitialProps = withSession()

export default withStore(initStore())(Index)
