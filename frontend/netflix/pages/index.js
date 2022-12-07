import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import List from '../components/list/list'
import requests from '../utils/requests'

export default function Home() {

  // TODO: Add comment section to movies.

  return (
    <div>
      <Head>
        <title>Netflix clone</title>
        <meta name="description" content="A Full stack Netflix clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-12">
        <List title="netflix originals" fetchUrl={requests.getNetflixOriginals} isLarge={true} />
        <List title="trending now" fetchUrl={requests.getTrending} isLarge={true} />
      </main>
    </div>
  )
}
