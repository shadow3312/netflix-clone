import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IMDBAPI } from '../../pages/api'
import { LocalMoviesAtom, profileAtom } from '../../state/atoms'
import {useRecoilValue} from 'recoil'
import {useRecoilState} from 'recoil'
import Card from '../card/card'

export default function List({title, fetchUrl, isLarge, isRated, local}) {
    //#region STATE
    const [movies, setMovies] = useState([])
    const [trailer, setTrailer] = useState('')
    const [isError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [localMovies, setLocalMovies] = useRecoilState(LocalMoviesAtom)
    const currentProfile = useRecoilValue(profileAtom)
    //#endregion

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

    useEffect(() => {
        if (local) {
            setMovies(localMovies)
        }
    }, [localMovies, movies, currentProfile])
    return (
        movies && <div className='-mt-6 mb-8'>
            <h4 className='text-2xl mb-2 text-white font-bold'>{capitalize(title)}</h4>
            <div className='mt-2 overflow-x-scroll overflow-y-hidden list'>
                <div className='inline-flex  '>
                {movies?.map((movie, i) => {
                    if (local) {
                        if (movie.profile_id === currentProfile.id)
                        {
                            return (
                                <Card key={movie.id} movie={movie} isLarge={isLarge} index={i} isRated={isRated} />
                            )
                        }
                    } else {
                        return (
                            <Card key={movie.id} movie={movie} isLarge={isLarge} index={i} isRated={isRated} />
                        )
                    }
                }
                )}
                </div>
            </div>
            </div>
        
    )
}
