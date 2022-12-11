import Image from 'next/image'
import React, { useState } from 'react'
import { GENRES } from '../../constants'
import IconButon from '../button/icon-buton'
import styles from './card.module.scss'
import {useRouter} from 'next/router'
import {useRecoilState} from 'recoil'
import { selectedMovieAtom, showMovieDetailAtom } from '../../state/atoms'
import { processGenres } from '../../utils'
const base_url = "https://image.tmdb.org/t/p/original"

const customLoader = ({ src, width, quality }) => {
  return `https://s3.amazonaws.com/demo/image/${src}?w=${width}&q=${quality || 75}`
}

export default function Card({movie, isLarge}) {
  const router = useRouter()
  const [fill, setFill] = useState(true)
  const [isHover, setHover] = useState(false)
  const [showDetail, setShowDetail] = useRecoilState(showMovieDetailAtom)
  const [selectedMovie, setSelectedMovie] = useRecoilState(selectedMovieAtom)

  const handleHover = () => {
    setFill(false)
  }

  const handleShowDetail = () => {
    setShowDetail(true)
    setSelectedMovie(movie)
  }

  const iconStyle = {
    color: "#fff",
    size: '1em',
  }
  
  return (
    <>
      <div className={`${styles.card} mb-12 mr-2 ${isLarge ? `w-56 h-36`: `w-56 h-80`} cursor-pointer relative transition-transform duration-500  hover:bg-[#111]`} onMouseOver={handleHover} onMouseLeave={() => setFill(true)} onClick={() => handleShowDetail()}>
        <Image 
            src={`${base_url}${isLarge ? movie.backdrop_path || movie.poster_path : movie.poster_path}`}
            height={!fill && 50}
            width={!fill && '200'}
            fill={fill}
            style={{objectFit: 'cover', borderRadius: 5}}
            className={`${styles.cardPoster} `}
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkMjOrBwABnwDvKNsECgAAAABJRU5ErkJggg=='
            placeholder="blur"
        />
        <div className={styles.cardInfo}>
          <h3 className='text-white text-xs font-bold mb-2'>{movie.title || movie.name}</h3>
          <div className='flex'>
            <IconButon bgColor="white" iconStyle={{color: '#000'}} iconName="play" additionnalStyle="pl-2" />
            <IconButon iconStyle={iconStyle} iconName="plus" />
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
