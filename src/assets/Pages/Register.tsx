import { Outlet, useNavigate } from 'react-router-dom'
import IntroPageComponent from '../../components/IntroPageComponent/IntroPageComponent'
import { useState } from 'react'
import img from '../../images/Upload-icon.png'
import Alert from '../../components/Alert/Alert'
import axios from 'axios'

export default function Register() {
    
    const [alert, setAlert] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [profileImg, setProfileImg] = useState(img)
    const [error, setError] = useState('')
    const [image, setImg] = useState('')

    const navigate = useNavigate()

    function RetryFunc() {
        setAlert(false)
    }

    function NoRetryFunc() {
        window.location.href = 'https://focal-x.com/'
    }

    function Send(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (
            firstName.trim() !== '' &&
            lastName.trim() !== '' &&
            email.trim() !== '' &&
            password.trim() !== '' &&
            confirmPassword.trim() !== '' &&
            profileImg !== ''
        ) {
            if (password?.trim() === confirmPassword?.trim()) {
                axios.post('https://test1.focal-x.com/api/register', {
                    first_name: firstName,
                    last_name: lastName,
                    user_name: `${firstName}_${lastName}`,
                    email: email,
                    password: password,
                    password_confirmation: confirmPassword,
                    profile_image: image
                }, 
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(res => {
                    localStorage.setItem('first-name' , res.data.data.user.first_name),
                    localStorage.setItem('last-name' , res.data.data.user.last_name),
                    localStorage.setItem('profile-image-url' , res.data.data.user.profile_image_url),
                    localStorage.setItem('token' , `Bearer ${res.data.data.token}`),
                    navigate('../dasboard')
                    console.log(res)
                })
                .catch(error => {
                    setAlert(true),
                    setError(error)
                })
            } else {
                setAlert(true)
                setError('Password is not equal to confirmPassword')
            }
        } else {
            setAlert(true)
            setError('You have to fill all fields to complete Sign Up')
        }
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImg (reader.result as string);
                setImg(event.target.files[0])
            };
            reader.readAsDataURL(event.target.files[0]);
            }
    }

    const formInputs = (
        <>
            <div>
                <label>Name</label>
                <div className='FM-row'>
                    <input
                        className="FM-input-45"
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        className="FM-input-45"
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password</label>
                <div className='FM-row'>
                    <input
                        className="FM-input-45"
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className="FM-input-45"
                        type="password"
                        placeholder="Re-enter your password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <label>Profile Image</label>
                <div className='FM-sign-img'>
                    <input
                        type="file"
                        onChange={handleImageChange} defaultValue={image}
                    />
                    <img src={profileImg} className='FM-profile-img' alt='profile-img' />
                </div>
                
            </div>
        </>
    )

    return (
        <>
            {alert && <Alert
                msg={error}
                yesBTN="Retry"
                noBTN="Cancel"
                RetryFunc={RetryFunc}
                NoRetryFunc={NoRetryFunc}
            />}
            <IntroPageComponent
                title="Sign up"
                desc="Fill in the following fields to create an account."
                inputs={formInputs}
                linkP="Do you have an account?"
                linkHref='../'
                linkA=" Sign in"
                handleSubmit={Send}
            />
            <Outlet />
        </>
    )
}
