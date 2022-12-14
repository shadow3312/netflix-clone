import React, { useEffect, useState } from 'react'
import { profileAtom, userAtom } from '../state/atoms'
import {useRecoilState} from 'recoil'
import Auth from '../components/auth/auth'

import NoSsr from '../components/no-ssr/no-ssr';
import Header from '../components/header/header';
import { BackendAPI } from './api';
import Image from 'next/image';
import Button from '../components/button/button';
import IconButon from '../components/button/icon-buton';
import { API_URL } from '../constants';
import { IoIosBrush, IoIosCheckmark } from 'react-icons/io';
import { IconContext } from 'react-icons';
import Navbar from '../components/navbar/navbar';

export default function Me() {
  //#region STATE
    const [user, setUser] = useRecoilState(userAtom)
    const [profiles, setProfiles] = useState([])
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [currentProfile, setProfile] = useRecoilState(profileAtom)
    const [edit, setEdit] = useState(false)
    const [create, setCreate] = useState(false)
    const [selectedFile, setSelectedFile] = React.useState(null)
    const [newName, setNewName] = useState('')
    const [type, setType] = useState('')
  //#endregion

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
    }, [])

    //#region On Change

    const onChangeName = (e) => {
      setError(false)
      setNewName(e.target.value)
    }

    const onChangeFile = (e) => {
      let file = e.target.files[0]
      console.log(file)
      setSelectedFile(file)
    }

    const onChangeType = (e) => {
      setType(e.target.value)
    }

    //#endregion

    const iconStyle = {
      color: "#fff",
      size: '1em',
    }

    const handleLogout = () => {
      setUser(undefined)
    }

    const handleSubmit = () => {
      let formData = new FormData()
      setError(false)
      const onSuccess = (response) => {
        let index = response.data.id
        edit && setProfiles(profiles => profiles.map((profile, i) => profile.id == index ? response.data : profile))
        setEdit(false)
        setSelectedFile('')
        setNewName('')
        setType('')

        create && fetchProfiles()
        setCreate(false)
      }
      const onError = (error) => {
        setError(true)
        setErrorMessage('An error has occured. Please try again later.')
      }
      const config = {
        headers:{
          "Content-Type": "multipart/form-data"
        }
      };

      // Append form data
      formData.append("name", newName || currentProfile.name)
      selectedFile?.name !== undefined && formData.append("profile_img", selectedFile)
      type.length > 0 ? formData.append("type", type) : formData.append("type", "ADULT")
      create && formData.append("user_id", user.id)

      let edit_url = `/profile/${currentProfile.id}/edit/`
      let create_url = `/profile/`
      let url = edit ? edit_url: create_url
      edit && BackendAPI.put(url, formData, config)
        .then(onSuccess)
        .catch(onError)
      create && BackendAPI.post(url, formData, config)
      .then(onSuccess)
      .catch(onError)
    }

    const handleDelete = (profile__id) => {
      const onSuccess = (response) => {
        setError(false)
        setEdit(false)
        setCreate(false)
        fetchProfiles()
      }
      const onError = (error) => {
        setError(true)
        setErrorMessage('An error has occured. Please try again later.')
      }
      BackendAPI.delete(`/profile/${profile__id}/delete/`)
        .then(onSuccess)
        .catch(onError)
    }

    const renderCurrent = () => {
      return <span className="top-0 right-0 absolute  w-5 h-5 bg-netflix-red border-2 border-white dark:border-gray-800 rounded-full"></span>
    }

    const renderForm = (profile) => {
      return (
        <div className='edit flex flex-col'>
          <input
            type='text'
            defaultValue={profile?.name}
            className='rounded-lg bg-gray-700 text-white  focus:ring-0'
            onChange={(e) =>{onChangeName(e)}} 
          />
          <select onChange={(e) => {onChangeType(e)}}>
            <option selected={profile?.type==="ADULT"} value="ADULT">Adult</option>
            <option selected={profile?.type==="KID"} value="KID">Kid</option>
          </select>
          <input
            type='file'
            className='text-white'
            multiple={false}
            onChange={(e) => {onChangeFile(e)}}
          />
          <div className='flex'>
            <Button bgColor={'green-300'} additionnalStyle={'w-1/3 self-center text-center'} text='Save' onClick={handleSubmit} />
            {edit && <Button bgColor={'green-300'} additionnalStyle={'w-1/3 self-center text-center'} text='Delete' onClick={() => {handleDelete(profile.id)}} />}
          </div>
        </div>
      )
    } 

    const renderBadge = (type) => {
      return <span className='text-white text-sm absolute ml-12 -mt-8 rounded bg-netflix-red px-2'>{type}</span>
    }

    return (
      <NoSsr>
        <>
          <Header title="My account" />
          <Navbar />
          {user?.id ?
            <div className='flex w-screen h-screen items-center justify-center'>
                <div className='container w-1/2 shadow-xl shadow-indigo-900/20 h-auto py-12 px-8 rounded-lg flex flex-col items-center'>
                  <h3 className='text-white text-4xl text-center font-bold mb-6'>Who&apos;s watching ?</h3>
                  <div className='flex'>
                    {profiles.map((profile) => (
                      <div className='flex flex-col items-center cursor-pointer mr-4 group' onClick={() => setProfile(profile)}>
                        <div className="relative">
                          <img className="w-24  h-24 ring-2 p-1 ring-gray-100 rounded-full z-10 object-cover" src={`${process.env.NEXT_PUBLIC_API_URL}${profile.profile_img}`} alt={`${user?.name} ${profile.id}`} fill />
                          {currentProfile.id === profile.id && renderCurrent()}
                          {renderBadge(profile.type)}
                        </div>
                        <div className='mt-4'>
                          <p className='text-lg text-white'>{profile?.name}</p>
                        </div>
                        <div className='absolute hidden rounded-full h-24 w-24 bg-gray-900/50 items-center justify-center group-hover:flex'>
                            <div className='flex items-center  border border-white rounded-2xl px-3 py-0'>
                              <IconContext.Provider value={iconStyle}>
                                {edit ?
                                  <IoIosCheckmark color='white' /> : <IoIosBrush color='white' />
                                }
                              </IconContext.Provider>
                              <span className='text-white pl-1 text-md font-medium hover:text-gray-300' onClick={() => {setEdit(!edit)}}>{edit ? `Done` : `Edit`}</span>
                            </div>
                        </div>
                        {edit && currentProfile.id === profile.id && 
                          renderForm(profile)
                        }
                      </div>
                    ))}
                  </div>
                  {error &&
                    <p className='text-netflix-red text-lg'>{errorMessage}</p>
                  }
                  {create && renderForm()}
                   <div className='buttons mt-6 flex flex-col items-center justify-center'>
                   {profiles.length < 4 && <IconButon additionnalStyle={'border border-white'} iconName={'plus'} iconStyle={iconStyle} onClick={() => {setCreate(true)}} /> }
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
