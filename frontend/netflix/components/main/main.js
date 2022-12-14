import React, { useEffect } from 'react'
import { userAtom } from '../../state/atoms'
import requests from '../../utils/requests'
import Banner from '../banner/banner'
import Footer from '../footer/footer'
import List from '../list/list'
import MovieDetail from '../modal/movie-detail'
import Navbar from '../navbar/navbar'
import {useRecoilValue} from 'recoil'
import { useRouter } from 'next/router'
import Auth from '../auth/auth'
import Header from '../header/header'
export default function Main() {
    const user = useRecoilValue(userAtom)
    const router = useRouter()
    
    return (
        user?.id ?
        <div>
            <Header title="Discover" />
            <Navbar />
            <Banner fetchUrl={requests.getTrending} />
            <main className="main pl-12 relative" style={{zIndex: 'auto'}}>
                <List title="trending now" fetchUrl={requests.getTrending} isLarge={true} />
                <List title="horror movies" fetchUrl={requests.getHorrorMovies} isLarge={true} />
                <List title="only on netflix" fetchUrl={requests.getNetflixOriginals} isLarge={false} />
                <List title="action" fetchUrl={requests.getActionMovies} isLarge={true} />
                <List title="top 10 in France today" fetchUrl={requests.getTopRated} isLarge={false} isRated={true} />
                <List title="comedies" fetchUrl={requests.getComedyMovies} isLarge={true} />
                <List title="documentaries" fetchUrl={requests.getDocumentaries} isLarge={true} />
                <List title="for kids" fetchUrl={requests.getKidMovies} isLarge={true} />
                <List title="Science Fiction" fetchUrl={requests.getSciFiMovie} isLarge={true} />
            </main>
            <MovieDetail />
            <Footer />
        </div> : <Auth />
    )
}
