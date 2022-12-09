import Image from 'next/image'
import React, { useState } from 'react'
import styles from './card.module.scss'

const base_url = "https://image.tmdb.org/t/p/original"

export default function Card({movie, isLarge}) {
  const [fill, setFill] = useState(true)
  const [isHover, setHover] = useState(false)

  const handleHover = () => {
    setFill(false)
  }
  
  return (
    console.log('movie ', movie),
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
          <h3 className='text-white text-xs font-bold'>{movie.title || movie.name}</h3>
        </div>
    </div>
  )
}
