import React from 'react'
import { userAtom } from '../state/atoms'
import {useRecoilState} from 'recoil'
import Auth from '../components/auth/auth'

import NoSsr from '../components/no-ssr/no-ssr';
import Header from '../components/header/header';

export default function Me() {
    const [user, setUser] = useRecoilState(userAtom)
  return (
    <NoSsr>
      
      <>
        <Header title="My account" />
        {user?.id ?
          <div className='flex w-screen'>
              <p className='text-white'>{user?.name}</p>
          </div>
          : <Auth />
        
        }
      </>
    </NoSsr>
  )
}
