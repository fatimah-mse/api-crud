import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import img from '../../images/FocalX-Logo.png'
import product from '../../images/Products-icon.png'
import bookmark from '../../images/bookmark-icon.png'
import logout from '../../images/logout-icon.png'
import './SideBar.css'
import axios from "axios"
import Alert from "../Alert/Alert"

export default function SideBar() {
    
    const [alert, setAlert] = useState(false)
    const [activeLink, setActiveLink] = useState('products')
    const [profileImage] = useState<string>(localStorage.getItem('profile-image-url') || '')

    const navigate = useNavigate()
    useEffect ( () => {
        if (!localStorage.getItem('token')) {
            navigate('../')
        }
    }, [])

    function LogoutAlert () {
        setAlert(true)
    }

    function RetryFunc () {
        Logout()
    }

    function NoRetryFunc () {
        setAlert(false)
    }

    function Logout() {
        
        axios.post('https://test1.focal-x.com/api/logout' , null ,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }
        )
            .then(res => {
                console.log(res)
                setAlert(false)
                navigate('../')
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    return (
        <>
            <section className="FM-side-bar">
                <img className="FM-focal-logo" src={img} alt="focal-logo" />
                <img className="FM-profile-image" src={profileImage} alt="profile-image" />
                <h2 className="FM-full-name">{localStorage.getItem('first-name')} {localStorage.getItem('last-name')}</h2>
                <Link to={''} onClick={() => setActiveLink('products')} className={`${activeLink === 'products' ? 'FM-yellow-bg' : ''} FM-side-link`} >
                    <img className="FM-products-icon" src={product} alt="products-icon" />
                    <span>Products</span>
                </Link>
                <Link to={'favorites'} onClick={() => setActiveLink('favorites')} className={`${activeLink === 'favorites' ? 'FM-yellow-bg' : ''} FM-side-link`} >
                    <img className="FM-bookmark-icon" src={bookmark} alt="favorites-icon" />
                    <span>Favorites</span>
                </Link>
                <Link to={'order'} onClick={() => setActiveLink('order')} className={`${activeLink === 'order' ? 'FM-yellow-bg' : ''} FM-side-link`} >
                    <img className="FM-bookmark-icon" src={bookmark} alt="order-icon" />
                    <span>order list</span>
                </Link>
                <Link to={''} onClick={LogoutAlert} className='FM-side-link FM-logout'>
                    <span>logout</span> 
                    <img className="FM-logout-icon" src={logout} alt="logout-icon" />
                </Link>
            </section>
            {alert && <Alert
                msg={'Are you Sure You want to Logout!!'}
                yesBTN="Sure"
                noBTN="Cancel"
                RetryFunc={RetryFunc}
                NoRetryFunc={NoRetryFunc}
            />}
        </>
    )
}
