import React from 'react'
import { userAtom } from '../state/atoms'
import {useRecoilState} from 'recoil'
import Main from '../components/main/main'

export default function Me() {
    const [user, setUser] = useRecoilState(userAtom)
  return (
    user?.id ? (
        <div className='flex w-screen'>
            <p>{user.name}</p>
        </div>
    ) : (
        <Main />
    )
  )
}
