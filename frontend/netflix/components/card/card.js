import Image from 'next/image'
import React from 'react'

const base_url = "https://image.tmdb.org/t/p/original"

export default function Card({movie, isLarge}) {
  return (
    <div className={`mb-12 mr-2 ${isLarge ? `w-56 h-36`: `w-56 h-80`} cursor-pointer relative shadow-lg`}>
        <Image 
            src={`${base_url}${isLarge ? movie.backdrop_path : movie.poster_path}`} 
            fill
            style={{objectFit: 'cover', borderRadius: 5}}

        />
    </div>
  )
}
