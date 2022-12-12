import React, { useEffect, useState } from 'react'
import { BackendAPI } from '../../pages/api'
import { userAtom } from '../../state/atoms'
import {useRecoilState} from 'recoil'
import Header from '../header/header'

export default function Auth() {
    // #region STATE
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState('')
    const [signIn, setSignIn] = useState(true)
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [emailMatch, setEmailMatch] = useState(false)
    const [user, setUser] = useRecoilState(userAtom)
    const [loading, setLoading] = useState(false)
    // #endregion

    // #region other constants
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const errorClass = 'border-0 border-b-red-500 focus:border-b-red-500 rounded-none'
    // #endregion

    //#region change input
    const onChangeName = (e) => {
        setError(false)
        setName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setError(false)
        setEmail(e.target.value)
        if (!signIn) {
            if (e.target.value.match(validRegex)) {
                setEmailMatch(true)
            } else {
                setEmailMatch(false)
            }
        }
        

    }
    const onChangePassword = (e) => {
        setError(false)
        setPassword(e.target.value)
        if (e.target.value === passwordConfirm) {
            setPasswordMatch(true)
        } else {
            setPasswordMatch(false)
        }
    }
    const onChangePasswordConfirm = (e) => {
        setError(false)
        setPasswordConfirm(e.target.value)
        if (e.target.value === password) {
            setPasswordMatch(true)
        } else {
            setPasswordMatch(false)
        }
    }

    //#endregion

    const displayLoading = () => {
        return (
            loading && (
                <div role="status">
                    <svg className="inline mr-2 w-6 h-6 text-gray animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )
        )  
    }

    const onError = (error) => {
        setLoading(false)
        setError(true)
        if (error?.response && error.response.status === 404) {
            setErrorMessage('Invalid credentials')
        } else if (error?.response?.data?.email) {
            setErrorMessage('This email is already taken. Please choose another one.')
        } 
        else {
            setErrorMessage('An error has occured. Please try again later')
        }
    }
    
    const onSuccess = (response) => {
        setLoading(false)
        setError(false)
        if (signIn) {
            setUser(response.data)
        } else {
            setSignIn(true)
        }
    }
    
    const handleLogin = async (payload) => {
        setLoading(true)
        setError(false)
        await BackendAPI.post('/auth/login/', payload)
            .then(onSuccess)
            .catch(onError)
    }

    const handleSignup = async (payload) => {
        setLoading(true)
        setError(false)
        await BackendAPI.post('/user/', payload)
            .then(onSuccess)
            .catch(onError)
    }    

    const validateFields = (fields) => {
        let invalid_fields = []
        let valid = false
        Object.entries(fields).forEach(([key, value]) => {
            value.length <= 0 && invalid_fields.push(key)
        })
        valid = invalid_fields.length === 0
        return valid
    }

    const checkField = (field) => {
        // TODO: Check requirements for a specific field
        let array = validateFields(field)
        return array
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let fields = {}
        if (signIn) {
            fields = { 
                email: email, 
                password: password
            }
            if (validateFields(fields)) {
                handleLogin(fields)
            } else {
                setError(true)
                setErrorMessage('Please fill in all the fields')
            }
            
        } else {
            fields = {
                name: name, 
                email: email, 
                password: passwordConfirm
            }
            if (validateFields(fields)) {
                if (password === passwordConfirm && emailMatch) {
                    handleSignup(fields)
                } else {
                    let message
                    if (!password !== passwordConfirm) message = 'Password not matching'
                    if (!emailMatch) message = 'Invalid email format'
                    setError(true)
                    setErrorMessage(message)
                }
            } else {
                setError(true)
                setErrorMessage('Please fill in all the fields')
            }
        }
    }
    return (
        <>
            <Header title="Welcome" />
            <div className='bg-[url(https://preview.redd.it/zjgs096khv591.jpg?width=960&crop=smart&auto=webp&s=ad329047269ea783645bb9d7f58729401ecab873)] bg-cover bg-center h-screen w-screen flex items-center justify-center'>
                <div className='container bg-black bg-opacity-80 w-1/3 h-auto px-12 py-6 rounded-lg'>
                    <form>
                        <h3 className='text-white text-4xl mb-6 font-bold'>{signIn ? 'Sign In' : 'Sign Up'}</h3>
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="email" name="email" onChange={onChangeEmail} id="email" className={`${!signIn && !emailMatch && errorClass} block py-2.5 w-full text-sm text-white bg-transparent border-b rounded-md  focus:outline-none focus:ring-0
                            focus:border-b
                            focus:border-0
                            focus:rounded-none focus:border-gray-600`} placeholder=" " required />
                            <label htmlFor="email" className="peer-focus:font-medium absolute px-2 text-sm text-gray-200  duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:px-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                        </div>
                        {!signIn && 
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="text" name="name" id="name" onChange={onChangeName} className="block py-2.5 w-full text-sm text-white bg-transparent border-b rounded-md  focus:outline-none focus:ring-0
                            focus:border-b
                            focus:border-0
                            focus:rounded-none focus:border-gray-600 peer" placeholder=" " required />
                            <label htmlFor="name" className="peer-focus:font-medium absolute px-2 text-sm text-gray-200  duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:px-0 peer-focus:scale-75 peer-focus:-translate-y-6">Display name</label>
                        </div>
                        }
                        <div className={`grid ${!signIn && `md:grid-cols-2 md:gap-6`} `}>
                            <div className="relative z-0 mb-6 w-full group">
                                <input type="password" onChange={onChangePassword} name="password" id="password" className={`${!signIn && !passwordMatch && errorClass} block py-2.5 w-full text-sm text-white bg-transparent border-b rounded-md  focus:outline-none focus:ring-0
                                focus:border-b
                                focus:border-0
                                focus:rounded-none focus:border-gray-600`} placeholder=" " required />
                                <label htmlFor="password" className="peer-focus:font-medium px-2 absolute text-sm text-gray-200  duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:px-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>
                            {!signIn &&
                            <div className="relative z-0 mb-6 w-full group">
                                <input type="password" onChange={onChangePasswordConfirm} name="repeat_password" id="repeat_password" className={`${!signIn && !passwordMatch && errorClass} block py-2.5 w-full text-sm text-white bg-transparent border-b  rounded-md  focus:outline-none focus:ring-0
                                focus:border-b
                                focus:border-0
                                focus:rounded-none focus:border-gray-600`} placeholder=" " required />
                                <label htmlFor="repeat_password" className="peer-focus:font-medium absolute px-2 text-sm text-gray-200  duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:px-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                            </div>
                            }
                        </div>
                        <button type="button" className="text-white bg-netflix-red hover:bg-red-800  focus:outline-none  font-medium rounded-md text-sm w-full px-5 py-2.5 text-center flex justify-center" onClick={handleSubmit}>{loading && displayLoading()} {signIn ? 'Sign in': 'Sign up'}</button>
                        <div className='mt-4'>
                            <p className='text-gray-200'>{signIn ? 'New here' : 'Already a member'}   ? 
                                <span className='cursor-pointer font-bold text-white' onClick={() => setSignIn(!signIn)}>{signIn ? ' Sign up': ' Sign in'}</span>
                            </p>
                        </div>
                        <div className='error text-red-600'>
                            {error && (
                                <p>{errorMessage}</p>
                            )}
                        </div>
                    </form>

                </div>

            </div>
        </>
        
    )
}
