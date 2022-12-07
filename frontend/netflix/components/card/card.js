import Image from 'next/image'
import React from 'react'

const base_url = "https://image.tmdb.org/t/p/original"

export default function Card({movie, isLarge}) {
  return (
    <div className='mb-4 mr-2 w-56 h-36 relative'>
        
        <Image 
            src={`${base_url}${isLarge ? movie.backdrop_path : movie.poster_path}`} 
            fill
            style={{objectFit: 'contain'}}
            className='rounded-xl'
        />
    </div>
  )
}
