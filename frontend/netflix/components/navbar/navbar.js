import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

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
        <div className={`nav fixed top-0 mb-32 w-full h-16 ${show && 'bg-netflix-black'} flex pl-12 p-4 justify-between items-center transition-all duration-500 ease-in`} style={{zIndex: 49}}>
            <Image
                src="/images/netflix.png"
                width={100}
                height={50}
                alt="netflix logo"
                className='cursor-pointer fit-contain'
            />
            <Link href="/me" className='cursor-pointer mr-8'>
                <Image
                    src="/images/avatar.png"
                    width={30}
                    height={30}
                    alt="netflix avatar"
                    className='rounded-full'
                />
            </Link>
            
            
        </div>
    )
}
