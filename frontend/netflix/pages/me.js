import React, { useEffect, useState } from 'react'
import { userAtom } from '../state/atoms'
import {useRecoilState} from 'recoil'
import Auth from '../components/auth/auth'

import NoSsr from '../components/no-ssr/no-ssr';
import Header from '../components/header/header';
import { BackendAPI } from './api';
import Image from 'next/image';
import Button from '../components/button/button';
import IconButon from '../components/button/icon-buton';

export default function Me() {
    const [user, setUser] = useRecoilState(userAtom)
    const [profiles, setProfiles] = useState([])
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const fetchProfiles = () => {
      const onSuccess = (response) => {
        setProfiles(response.data.results)
      }
      const onError = (error) => {
        setError(error)
        setErrorMessage('An error has occured while fetching profiles. Please try again later.')
      }
      BackendAPI.get(`/profile/search/?user__email=${user?.email}`)
        .then(onSuccess)
        .catch(onError)
    }
    useEffect(() => {
      fetchProfiles()
    }, [user])

    const iconStyle = {
      color: "#fff",
      size: '1em',
    }

    const handleLogout = () => {
      setUser(undefined)
    }

    return (
      <NoSsr>
        <>
          <Header title="My account" />
          {user?.id ?
            <div className='flex w-screen h-screen items-center justify-center'>
                <div className='container w-1/2 shadow-xl shadow-indigo-900/20 h-auto py-12 px-8 rounded-lg flex flex-col items-center'>
                  <h3 className='text-white text-4xl text-center font-bold mb-6'>Who's watching ?</h3>
                  <div className='flex'>
                    {profiles.map((profile) => (
                      <div className='flex flex-col items-center cursor-pointer mr-4'>
                        <div className="relative">
                          <img className="w-24  h-24 ring-2 p-1 ring-gray-100 rounded-full" src="/images/avatar.png" alt={`${user?.name} ${profile.id}`} fill />
                          <span className="top-0 right-0 absolute  w-5 h-5 bg-netflix-red border-2 border-white dark:border-gray-800 rounded-full"></span>
                        </div>
                        <div className='mt-4'>
                          <p className='text-lg text-white'>{user?.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='buttons mt-6'>
                    <Button text={'Manage profiles'} additionnalStyle={'border border-white'} iconName="edit" iconStyle={iconStyle} />
                    <Button text={'Logout'} additionnalStyle={'border border-white mx-auto'} iconName={'logout'} iconStyle={iconStyle} onClick={handleLogout} />
                  </div>
                </div>
            </div>
            : <Auth />
          }
        </>
      </NoSsr>
    )
}
