import Head from 'next/head'
import Banner from '../components/banner/banner'
import Footer from '../components/footer/footer'
import List from '../components/list/list'
import MovieDetail from '../components/modal/movie-detail'
import Navbar from '../components/navbar/navbar'
import { userAtom } from '../state/atoms'
import requests from '../utils/requests'
import {useRecoilValue} from 'recoil'
// import Main from '../components/main/main'
import Auth from '../components/auth/auth'
import { useEffect } from 'react'
import { Router } from 'next/router'
import Me from './me'
import dynamic from "next/dynamic";

const Main = dynamic(() => import("../components/main/main"), { ssr: false });
export default function Home() {
  const user = useRecoilValue(userAtom)
  // TODO: Add comment section to movies.

  
  // if (!user?.id) {
  //   return <Auth />
  // }
  
  return (
    <div className='relative' suppressHydrationWarning>
      <Head>
        <title>Netflix clone</title>
        <meta name="description" content="A Full stack Netflix clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </div>
  )
}
