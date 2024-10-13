import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import img from '../../images/Control.png'
import product from '../../images/Default-product.png'
import './Show.css'


export default function Show() {

    interface Phone {
        name: string,
        image_url?: string,
        price: number,
        created_at: string,
        updated_at: string
    }

    const params = useParams()
    const navigate = useNavigate()
    const [phone, setPhone] = useState<Phone>()
    const [isLinkValid, setIsLinkValid] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('./')
        }
        else {
            axios.get(`https://test1.focal-x.com/api/items/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    setPhone(res.data),
                    console.log(res),
                    axios.get(res.data[0].image_url)
                    .then(response => {
                        if (response.status !== 201) {
                            setIsLinkValid(false)
                        } else {
                            setIsLinkValid(true)
                        }
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [])

    function formatDateTime(dateTime: any) {
        if (!dateTime) return '';
        const date = new Date(dateTime);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\//g, '/');
    }

    return (
        <div className="FM-show">
            <img className="FM-return-logo" onClick={() => navigate('../')} src={img} alt="return-logo" />
            <h2 className="FM-phone-detail">{phone?.name}</h2>
            <img className="FM-phone-img" src={isLinkValid ? phone?.image_url : product} alt='Phone' />
            <div className="FM-phone-details">
                <p className="FM-phone-detail">price: <span>{phone?.price}$</span></p>
                <p className="FM-phone-detail">Added at: <span>{formatDateTime(phone?.created_at)}</span></p>
                <p className="FM-phone-detail">updated at: <span>{formatDateTime(phone?.updated_at)}</span></p>
            </div>
        </div>
    )
}
