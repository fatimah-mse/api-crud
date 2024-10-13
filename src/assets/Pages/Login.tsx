import { Outlet, useNavigate } from "react-router-dom"
import IntroPageComponent from "../../components/IntroPageComponent/IntroPageComponent";
import { useState } from "react";
import axios from "axios";
import Alert from "../../components/Alert/Alert";


export default function Login() {

    const [alert,setAlert] = useState(false)
    const [err,setError] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()

    function RetryFunc () {
        setAlert(false)
    }

    function NoRetryFunc () {
        window.location.href='https://focal-x.com/'
    }

    function Send (event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (email?.trim() !== '' && password?.trim() !== '') {
            axios.post('https://test1.focal-x.com/api/login' , 
                {
                    email : email,
                    password : password
                }
            ).then (res => 
                {
                    localStorage.setItem('first-name' , res.data.user.first_name),
                    localStorage.setItem('last-name' , res.data.user.last_name),
                    localStorage.setItem('profile-image-url' , res.data.user.profile_image_url),
                    localStorage.setItem('token' , `Bearer ${res.data.token}`),
                    navigate('dasboard')
                }
            ).catch (error => {
                    setAlert(true),
                    setError(error.response?.data?.message)
                })
        }
        else {
            setAlert(true),
            setError('you have to fill all fileds to complete login')
        }
        
    }

    const formInputs = (
        <>
            <div className="FM-input-flex">
                <label>Email</label>
                <input 
                    type="email" 
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="FM-input-flex">
                <label>Password</label>
                <input 
                    type="password" 
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </>
    )

    return (
        <>
            {alert && <Alert 
                msg={err} 
                yesBTN="OK"
                noBTN="Cancel"
                RetryFunc={RetryFunc}
                NoRetryFunc={NoRetryFunc}
            />}
            <IntroPageComponent 
                title = "Sign In"
                desc = "Enter your credentials to access your account"
                inputs = {formInputs}
                linkP = "Don’t have an account?"
                linkHref = "sign-up"
                linkA = "Create one"
                handleSubmit = {Send}
            />
            <Outlet/>
        </>
    )
}
