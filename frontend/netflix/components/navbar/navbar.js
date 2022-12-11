import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Navbar() {
    const [show, setShow] = useState(false)
    
    const animateNavbar = () => {
        if (window.scrollY > 80) {
            setShow(true)
        } else {
            setShow(false)
        }
    }
    useEffect(() => {
      window.addEventListener("scroll", animateNavbar)
      return () => window.removeEventListener("scroll", animateNavbar)
    }, [])
    
    return (
        <div className={`nav fixed top-0 mb-32 w-full h-16 ${show && 'bg-netflix-black'} flex pl-12 p-4 justify-between items-center transition-all duration-500 ease-in`} style={{zIndex: 999}}>
            <Image
                src="/images/netflix.png"
                width={100}
                height={50}
                alt="netflix logo"
                className='fixed cursor-pointer fit-contain'
            />
            <Image
                src="/images/avatar.png"
                width={30}
                height={30}
                alt="netflix avatar"
                className='fixed cursor-pointer right-12 rounded-full'
            />
        </div>
    )
}
