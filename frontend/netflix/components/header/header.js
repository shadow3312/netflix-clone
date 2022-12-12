import Head from 'next/head'
import React from 'react'
import { APP_NAME } from '../../constants'

export default function Header({title}) {
  return (
    <Head>
        <title>{`${APP_NAME}: ${title}`}</title>
        <meta name="description" content="A Full stack Netflix clone" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
