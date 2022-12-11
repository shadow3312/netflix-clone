import React, { useEffect, useState } from 'react'
import { IMDBAPI } from '../../pages/api'
import { shortenString } from '../../utils'
import Button from '../button/button'

const base_url = "https://image.tmdb.org/t/p/original"

export default function Banner({fetchUrl}) {
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [movies, setMovies] = useState([])
    const [topMovie, setTopMovie] = useState({})

    const fetchTrending = async () => {
        const onSuccess = (response) => {
            let res = response.data.results
            setMovies(res)
        }
        const onError = (err) => {
            console.log(err)
        }
        await IMDBAPI.get(fetchUrl)
            .then(onSuccess)
            .catch(onError)
    }

    const pickRandomImage = (movies) => {
        // Pick a random image from netflix trending movies
        let movie = movies[Math.floor(Math.random()*movies.length)];
        setTopMovie(movie)
    }

    const iconStyle = {
        size: '1em'
    }

    useEffect(() => {
        pickRandomImage(movies)
    }, [movies])
 
    useEffect(() => {
        fetchTrending()
    }, [fetchUrl])

    return (
        <div className={`banner relative bg-cover h-[80vh] w-full p-0`} style={{border: 'solid 1px #000', backgroundImage: `url(${base_url}${topMovie && topMovie.backdrop_path})`, backgroundSize: 'cover'}}>
            <div className='flex flex-col absolute top-1/4 w-1/2 p-12 z-10'>
                <h1 className='text-5xl text-white drop-shadow-lg font-bold mb-4'>{topMovie && (topMovie.title || topMovie.name)}</h1>
                <p className='text-white text-xl font-medium'>{topMovie && shortenString(topMovie.overview, 150)}</p>
                <div className='flex mt-4'>
                    <Button text="whatch now" bgColor='#D81F26' iconName='play'
                    iconStyle={iconStyle} />
                    <Button text="More info" bgColor='transparent' iconName='info' iconStyle={iconStyle} />
                </div>
            </div>
            <div className='gradient__bottom'></div>
        </div>
    )
}
