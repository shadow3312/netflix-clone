import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import Banner from '../components/banner/banner'
import List from '../components/list/list'
import Navbar from '../components/navbar/navbar'
import requests from '../utils/requests'

export default function Home() {

  // TODO: Add comment section to movies.

  return (
    <div className='relative'>
      <Head>
        <title>Netflix clone</title>
        <meta name="description" content="A Full stack Netflix clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Banner fetchUrl={requests.getTrending} />
      <main className="ml-12 relative">
        <List title="trending now" fetchUrl={requests.getTrending} isLarge={true} />
        <List title="horror movies" fetchUrl={requests.getHorrorMovies} isLarge={true} />
        <List title="only on netflix" fetchUrl={requests.getNetflixOriginals} isLarge={false} />
        <List title="trending now" fetchUrl={requests.getTrending} isLarge={true} />
        <List title="romance" fetchUrl={requests.getRomanceMovies} isLarge={true} />
        <List title="comedies" fetchUrl={requests.getComedyMovies} isLarge={true} />
        <List title="action" fetchUrl={requests.getActionMovies} isLarge={true} />
      </main>
    </div>
  )
}
