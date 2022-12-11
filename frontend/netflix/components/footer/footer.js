import React from 'react'
import { IoIosHeart } from 'react-icons/io'
export default function Footer() {
  return (
    <footer className='footer w-full mb-4'>
        <p className='text-white text-center flex items-center justify-center'>Made with&nbsp; <IoIosHeart /> &nbsp;by 
            <a className='text-netflix-red font-bold' href='https://shuruzer.vercel.app'>&nbsp;Shuruzer</a>
        </p>
    </footer>
  )
}
