import React, { useEffect, useState } from 'react'
import { IMDBAPI } from '../../pages/api'

export default function List({title, fetchUrl, }) {
    const [movies, setMovies] = useState([])
    const [trailer, setTrailer] = useState('')
    const [isError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

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
        <div className='flex'>
            <h3 className='text-2xl'>{title.toUpperCase()}</h3>
        </div>
    )
}
