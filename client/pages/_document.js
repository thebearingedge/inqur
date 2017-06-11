import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, injectGlobal } from 'styled-components'

injectGlobal`
  html {
    box-sizing: border-box;
    background-color: #141518;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'Open Sans', sans-serif;
    color: #f2f2f2;
  }
  .root {
    min-height: 100%;
  }
`

export default class extends Document {
  render() {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main/>)
    const styleTags = sheet.getStyleElement()
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css'/>
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i'/>
          { styleTags }
          <title>Inqur</title>
        </Head>
        <body>
          <div className="root">{ main }</div>
          <NextScript />
        </body>
      </html>
    )
  }
}
