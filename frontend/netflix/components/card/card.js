import Image from 'next/image'
import React, { useState } from 'react'
import { BASE_IMG_URL, GENRES } from '../../constants'
import IconButon from '../button/icon-buton'
import styles from './card.module.scss'
import {useRouter} from 'next/router'
import {useRecoilState, useRecoilValue} from 'recoil'
import { LocalMoviesAtom, profileAtom, selectedMovieAtom, showMovieDetailAtom } from '../../state/atoms'
import { processGenres } from '../../utils'


const customLoader = ({ src, width, quality }) => {
  return `https://s3.amazonaws.com/demo/image/${src}?w=${width}&q=${quality || 75}`
}

export default function Card({movie, isLarge, isRated, index, local}) {
  //#region 
  const router = useRouter()
  const [fill, setFill] = useState(true)
  const [isHover, setHover] = useState(false)
  const [showDetail, setShowDetail] = useRecoilState(showMovieDetailAtom)
  const [selectedMovie, setSelectedMovie] = useRecoilState(selectedMovieAtom)
  const [localMovies, setLocalMovies] = useRecoilState(LocalMoviesAtom)
  const currentProfile = useRecoilValue(profileAtom)
  //#endregion

  const handleHover = () => {
    setFill(false)
  }

  const handleShowDetail = () => {
    setShowDetail(true)
    setSelectedMovie(movie)
  }

  const handleAddOrRemoveToList = (movie) => {
    // let exists = false
    let itemIndex = localMovies.findIndex((item) => (item.id === movie.id && item.profile_id === currentProfile.id))
    let temp_array = []
    if (itemIndex != -1) {
      temp_array = localMovies.filter((item, index) => index !== itemIndex)
    } else {
      movie.profile_id = currentProfile.id
      Object.preventExtensions(movie)
      temp_array = [...localMovies, movie]
    }
    setLocalMovies(temp_array)

    // localMovies.filter((local_movie, i) => {
    //     exists = local_movie.id === movie.id && local_movie.profile_id===currentProfile.id
    //     if (exists) {
    //       return local_movie.id !== movie.id && local_movie.profile_id!==currentProfile.id 
    //     }
    // })

    // if (!exists) {
    //   movie.profile_id = currentProfile.id
    //   Object.preventExtensions(movie)
    //   let temp_array = [...localMovies, movie]
    //   setLocalMovies(temp_array)
    // }
    
    
    // localMovies.push(temp_array)
  }

  const iconStyle = {
    color: "#fff",
    size: '1em',
  }
  
  return (
    <>
      <div className={`${styles.card} mb-12 mr-2 ${isLarge ? `w-56 h-36`: styles.long} cursor-pointer relative transition-transform duration-500 ${isRated && styles.rated}`} onMouseOver={handleHover} onMouseLeave={() => setFill(true)}>
          <div className='h-1/2 flex justify-between'  onClick={() => handleShowDetail()}>
            {isRated && fill && index < 10 &&  (
              <p className={styles.text__rated}>{index+1}</p>
            )}
            <Image 
              src={`${BASE_IMG_URL}${isLarge ? movie.backdrop_path || movie.poster_path : movie.poster_path}`}
              height={!fill && '50'}
              width={!fill && '200'}
              fill={fill}
              style={{
                objectFit: isRated && fill ? 'cover': 'cover', borderRadius: 5,
                marginLeft: isRated && fill && 45
              }}
              className={`${styles.cardPoster} `}
              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkMjOrBwABnwDvKNsECgAAAABJRU5ErkJggg=='
              placeholder="blur"
              alt={movie.title || movie.name}
            />
          </div>
          
        
        <div className={styles.cardInfo}>
          <h3 className='text-white text-xs font-bold mb-2'>{movie.title || movie.name}</h3>
          <div className='flex z-40'>
            <IconButon bgColor="white" iconStyle={{color: '#000'}} iconName="play" additionnalStyle="pl-2" />
            <IconButon iconStyle={iconStyle} iconName={local ? 'minus' : 'plus'} onClick={() => handleAddOrRemoveToList(movie)} />
            <IconButon iconStyle={iconStyle} iconName="like" />
            <IconButon iconStyle={iconStyle} iconName="dislike" />
            <IconButon iconStyle={iconStyle} iconName="arrow-down" additionnalStyle="ml-auto" onClick={() => {handleShowDetail()}} />
          </div>
          <div className='flex mt-2'>
            {processGenres(movie.genre_ids)}
          </div>
        </div>
      </div>
    </>
  )
}
