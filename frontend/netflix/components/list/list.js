import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IMDBAPI } from '../../pages/api'
import Card from '../card/card'

export default function List({title, fetchUrl, isLarge}) {
    const [movies, setMovies] = useState([])
    const [trailer, setTrailer] = useState('')
    const [isError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const capitalize = (str) => {
        var word = str.toLowerCase().split(' ');
        for (var i = 0; i < word.length; i++) {
            word[i] = word[i].charAt(0).toUpperCase() + word[i].substring(1);     
        }
        return word.join(' ');
    } 

    const fetchMovies = async (fetchUrl) => {
        const onSuccess = (response) => {
            setMovies(response.data.results)
        }
        const onError = (err) => {
            setError(true)
            setErrorMessage('An error occured. Please try again later')
        }
        await IMDBAPI.get(fetchUrl)
                .then(onSuccess)
                .catch(onError)
    }

    useEffect(() => {
        fetchMovies(fetchUrl)
    }, [fetchUrl])
    return (
        <div>
            <h4 className='text-2xl mb-2'>{capitalize(title)}</h4>
            <div className='mt-2 overflow-x-scroll overflow-y-hidden list'>
                <div className='inline-flex  '>
                {movies.map((movie) => (
                    <Card key={movie.id} movie={movie} isLarge={isLarge} />
                ))}
                </div>
            </div>
            </div>
        
    )
}
