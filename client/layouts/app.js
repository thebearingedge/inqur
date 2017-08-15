import React from 'react'
import Head from 'next/head'
import Navbar from '../components/navbar'

const App = ({ children }) =>
  <div>
    <Head>
      <title>Inqur: The most awesome polls on the Internet</title>
    </Head>
    <Navbar/>
    { children }
  </div>

export default App
