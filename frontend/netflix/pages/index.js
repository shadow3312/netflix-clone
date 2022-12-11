import Head from 'next/head'
import Banner from '../components/banner/banner'
import List from '../components/list/list'
import MovieDetail from '../components/modal/movie-detail'
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
      <main className="main pl-12 relative" style={{zIndex: 'auto'}}>
        <List title="trending now" fetchUrl={requests.getTrending} isLarge={true} />
        <List title="horror movies" fetchUrl={requests.getHorrorMovies} isLarge={true} />
        <List title="only on netflix" fetchUrl={requests.getNetflixOriginals} isLarge={false} />
        <List title="trending now" fetchUrl={requests.getTrending} isLarge={true} />
        <List title="comedies" fetchUrl={requests.getComedyMovies} isLarge={true} />
        <List title="action" fetchUrl={requests.getActionMovies} isLarge={true} />
        <List title="top 10 in France today" fetchUrl={requests.getTopRated} isLarge={true} isRated={true} />
        <List title="documentaries" fetchUrl={requests.getDocumentaries} isLarge={true} />
        <List title="for kids" fetchUrl={requests.getKidMovies} isLarge={true} />
        <List title="Science Fiction" fetchUrl={requests.getSciFiMovie} isLarge={true} />
      </main>
      <MovieDetail />
    </div>
  )
}
