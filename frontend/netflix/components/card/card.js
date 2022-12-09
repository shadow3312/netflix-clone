import Image from 'next/image'
import React, { useState } from 'react'
import { GENRES } from '../../constants'
import IconButon from '../button/icon-buton'
import styles from './card.module.scss'
import {useRouter} from 'next/router'
import Link from 'next/link'
const base_url = "https://image.tmdb.org/t/p/original"

export default function Card({movie, isLarge}) {
  const router = useRouter()
  const [fill, setFill] = useState(true)
  const [isHover, setHover] = useState(false)

  const handleHover = () => {
    setFill(false)
  }

  const processGenres = (ids) => {
    let j = 0
    return (
      GENRES.map((genre, i) => {
        if (ids.includes(genre.id)) {
          return (
          <div className='mr-0.5 bg-[#DB0000] hover:bg-[#AF0000] text-blue-800 text-xs font-semibold px-2.5 py-0.1 pb-0.5 rounded'>
            <span key={i} className="text-white text-[10px] font-bold">{genre.name}</span>
          </div>
        )}
      })
    )
    
  }

  const handleClick = (href) => {
    router.push(href)
  }

  const iconStyle = {
    color: "#fff",
    size: '1em',
  }
  
  return (
    <div className={`${styles.card} mb-12 mr-2 ${isLarge ? `w-56 h-36`: `w-56 h-80`} cursor-pointer relative transition-transform duration-500 hover:z-50 hover:bg-[#111]`} onMouseOver={handleHover} onMouseLeave={() => setFill(true)}>
        <Image 
            src={`${base_url}${isLarge ? movie.backdrop_path || movie.poster_path : movie.poster_path}`}
            height={!fill && 50}
            width={!fill && '200'}
            fill={fill}
            style={{objectFit: 'cover', borderRadius: 5}}
            className={`${styles.cardPoster} `}
        />
        <div className={styles.cardInfo}>
          <h3 className='text-white text-xs font-bold mb-2'>{movie.title || movie.name}</h3>
          <div className='flex'>
            <IconButon bgColor="#fff" iconStyle={{color: '#000'}} iconName="play" additionnalStyle="pl-2" />
            <IconButon iconStyle={iconStyle} iconName="plus" />
            <IconButon iconStyle={iconStyle} iconName="like" />
            <IconButon iconStyle={iconStyle} iconName="dislike" />
            <Link
              href={`/movies/${movie.id}`}
              className='ml-auto'
            >
              <IconButon iconStyle={iconStyle} iconName="arrow-down" additionnalStyle="ml-auto" />
            </Link>
          </div>
          <div className='flex mt-2'>
            {processGenres(movie.genre_ids)}
          </div>
        </div>
    </div>
  )
}
