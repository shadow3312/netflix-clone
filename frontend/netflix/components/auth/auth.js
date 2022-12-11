import React, { useState } from 'react'

export default function Auth() {
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState('')
    const [signIn, setSignIn] = useState(true)
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [emailMatch, setEmailMatch] = useState(false)

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    //#region change input
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e) => {
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
        setPassword(e.target.value)
    }
    const onChangePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value)
        if (e.target.value === password) {
            setPasswordMatch(true)
        } else {
            setPasswordMatch(false)
        }
    }

    const errorClass = 'border-0 border-b-red-500 focus:border-b-red-500 rounded-none'
    //#endregion
    
    const handleLogin = () => {

    }

    const handleSignup = () => {

    }

    useEffect(() => {
        // set error to true when errorMessage is set 
        errorMessage.length > 0 ? setError(true) : setError(false)
    }, [errorMessage])
    

    const validateFields = (fields) => {
        let invalid_fields = []
        let valid = false
        console.log(fields)
        Object.entries(fields).forEach(([key, value]) => {
            valid = value.length <= 0
            valid && invalid_fields.push(key)
        })
        return valid
    }

    const checkField = (field) => {
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
                if (passwordMatch && emailMatch) {
                    handleLogin(fields)
                } else {
                    let message
                    if (!passwordMatch) message = 'Password not matching'
                    if (!emailMatch) message = 'Invalid email format'
                    setErrorMessage(message)
                }
            } else {
                setErrorMessage('Please fill in all the fields')
            }
        } else {
            fields = {
                name: name, 
                email: email, 
                password: passwordConfirm
            }
        }
        console.log(validateFields(fields))
        // if (signIn) {

        // } else {
        //     // Validate fields not empty
        //     if (email.length > 0 && name.length > 0 && password.length > 0 && passwordConfirm.length > 0) {
        //         // Validate requirements match
        //         if (emailMatch && passwordMatch) {
        //             const payload = {
        //                 "name": name,
        //                 "email": email,
        //                 "password": passwordConfirm
        //             }
        //             handleSignup(payload)
        //         }
        //     }
        // }        
    }
    return (
        <div className='bg-[url(https://preview.redd.it/zjgs096khv591.jpg?width=960&crop=smart&auto=webp&s=ad329047269ea783645bb9d7f58729401ecab873)] bg-cover bg-center h-screen w-screen flex items-center justify-center'>
            <div className='container bg-black bg-opacity-80 w-1/3 h-auto px-12 py-6 rounded-lg'>
                <form>
                    <h3 className='text-white text-4xl mb-6 font-bold'>{signIn ? 'Sign In' : 'Sign Up'}</h3>
                    <div class="relative z-0 mb-6 w-full group">
                        <input type="email" name="email" onChange={onChangeEmail} id="email" class={`${!signIn && !emailMatch && errorClass} block py-2.5 w-full text-sm text-white bg-transparent border-b rounded-md  focus:outline-none focus:ring-0
                        focus:border-b
                        focus:border-0
                        focus:rounded-none focus:border-gray-600`} placeholder=" " required />
                        <label htmlFor="email" class="peer-focus:font-medium absolute px-2 text-sm text-gray-200  duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:px-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    </div>
                    {!signIn && 
                    <div class="relative z-0 mb-6 w-full group">
                        <input type="text" name="name" id="name" onChange={onChangeName} class="block py-2.5 w-full text-sm text-white bg-transparent border-b rounded-md  focus:outline-none focus:ring-0
                        focus:border-b
                        focus:border-0
                        focus:rounded-none focus:border-gray-600 peer" placeholder=" " required />
                        <label htmlFor="name" class="peer-focus:font-medium absolute px-2 text-sm text-gray-200  duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:px-0 peer-focus:scale-75 peer-focus:-translate-y-6">Display name</label>
                    </div>
                    }
                    <div class={`grid ${!signIn && `md:grid-cols-2 md:gap-6`} `}>
                        <div class="relative z-0 mb-6 w-full group">
                            <input type="password" onChange={onChangePassword} name="password" id="password" class={`${!signIn && !passwordMatch && errorClass} block py-2.5 w-full text-sm text-white bg-transparent border-b rounded-md  focus:outline-none focus:ring-0
                            focus:border-b
                            focus:border-0
                            focus:rounded-none focus:border-gray-600`} placeholder=" " required />
                            <label htmlFor="password" class="peer-focus:font-medium px-2 absolute text-sm text-gray-200  duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:px-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                        {!signIn &&
                        <div class="relative z-0 mb-6 w-full group">
                            <input type="password" onChange={onChangePasswordConfirm} name="repeat_password" id="repeat_password" class={`${!signIn && !passwordMatch && errorClass} block py-2.5 w-full text-sm text-white bg-transparent border-b  rounded-md  focus:outline-none focus:ring-0
                            focus:border-b
                            focus:border-0
                            focus:rounded-none focus:border-gray-600`} placeholder=" " required />
                            <label htmlFor="repeat_password" class="peer-focus:font-medium absolute px-2 text-sm text-gray-200  duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:px-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                        </div>
                        }
                    </div>
                    <button type="button" class="text-white bg-netflix-red hover:bg-red-800  focus:outline-none  font-medium rounded-md text-sm w-full px-5 py-2.5 text-center" onClick={handleSubmit}>{signIn ? 'Sign in': 'Sign up'}</button>
                    <div className='mt-4'>
                        <p className='text-gray-200'>{signIn ? 'New here' : 'Already a member'}   ? 
                            <span className='cursor-pointer font-bold text-white' onClick={() => setSignIn(!signIn)}>{signIn ? ' Sign up': ' Sign in'}</span>
                        </p>
                    </div>
                </form>

            </div>

        </div>
    )
}
