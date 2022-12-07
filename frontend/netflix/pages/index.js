import Head from 'next/head'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import List from '../components/list/list'
import { decrement, increment } from '../slices/counterSlice'
import requests from '../utils/requests'

export default function Home() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  // TODO: Add comment section to movies.

  return (
    <div>
      <Head>
        <title>Netflix clone</title>
        <meta name="description" content="A Full stack Netflix clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <List title="netflix originals" fetchUrl={requests.getNetflixOriginals} />
      <List title="trending now" fetchUrl={requests.getTrending} />

      </main>
    </div>
  )
}
