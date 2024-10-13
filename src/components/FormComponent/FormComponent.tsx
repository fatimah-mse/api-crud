import { useNavigate, useParams } from 'react-router-dom'
import img from '../../images/Control.png'
import upload from '../../images/Upload-icon.png'
import { useEffect, useState } from 'react'
import Alert from '../Alert/Alert'
import axios from 'axios'
import './FormComponent.css'

interface Phone {
    title: string
    handleSubmit: (name: string, price: string, img: string) => void
}

export default function FormComponent({ title, handleSubmit }: Phone) {

    const params = useParams()
    const navigate = useNavigate()
    const [alert, setAlert] = useState(false)
    const [save, setSave] = useState('no')
    const [err, setErr] = useState('')
    const [phonename, setName] = useState('')
    const [phoneprice, setPrice] = useState('')
    const [phoneimgurl, setImgurl] = useState(upload)
    const [phoneimg, setImg] = useState('')

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('./')
        } 
        if (params.id) {
            axios.get(`https://test1.focal-x.com/api/items/${params.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    setName(res.data.name)
                    setPrice(res.data.price)
                    setImg(res.data.image)
                    setImgurl(res.data.image_url)
                    console.log(res)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [])

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!phonename || !phoneprice) {
            setAlert(true)
            setErr('You Have To fill all inputs to complete saving')
        } else {
            setAlert(true)
            console.log(phonename, phoneprice)
            setErr('Are you sure you want to save the changes?')
            setSave('yes')
        }
    }

    function RetryFunc() {
        if (save === 'yes') {
            handleSubmit(phonename, phoneprice, phoneimg)
            navigate('../')
        } else {
            setAlert(false)
        }
    }

    function NoRetryFunc() {
        navigate('../')
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setImgurl(reader.result as string);
                setImg(event.target.files[0])
            };
            reader.readAsDataURL(event.target.files[0]);
            }
    }

    return (
        <>
            <div className="FM-form">
                <img className="FM-return-logo" onClick={() => navigate('../')} src={img} alt="return-logo" />
                <h2 className="FM-phone-detail FM-add-edit">{title}</h2>
                <form className='FM-form-add-edit' onSubmit={handleSave} method='post'>
                    <div>
                        <label className="FM-phone-lable">Name</label>
                        <input className='FM-input FM-mb' type="text" placeholder='Enter the product name' onChange={(e) => setName(e.target.value)} defaultValue={phonename} />
                        <label className="FM-phone-lable">Price</label>
                        <input className='FM-input' type="number" placeholder='Enter the product price' onChange={(e) => setPrice(e.target.value)} defaultValue={phoneprice} />
                    </div>
                    <div>
                        <label className="FM-phone-lable">Image</label>
                        <div className='FM-img-control'>
                            <input type="file" onChange={handleImageChange} defaultValue={phoneimg} />
                            <img src={phoneimgurl} alt="phone image" />
                        </div>
                    </div>
                    <input className='FM-save FM-btn FM-yellow-bg' type="submit" value="Save" />
                </form>
            </div>
            {alert && <Alert
                msg={err}
                yesBTN="Ok"
                noBTN="Cancel"
                RetryFunc={RetryFunc}
                NoRetryFunc={NoRetryFunc}
            />}
        </>
    )
}

