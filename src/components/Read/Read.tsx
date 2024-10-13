import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import search from '../../images/search-icon.png'
import product from '../../images/Default-product.png'
import axios from "axios"
import './Read.css'
import Alert from "../Alert/Alert"

export default function Read() {

    interface PhoneImage {
        image_url: string,
        name: string,
        id: number
    }

    const [alert, setAlert] = useState(false)
    const [idItem, setIdItem] = useState(0)
    const [searchPhone, setSearchPhone] = useState('')
    const [phoneImg, setPhoneImg] = useState<PhoneImage[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(8)
    const [isLinkValid, setIsLinkValid] = useState(false)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = phoneImg.slice(indexOfFirstItem, indexOfLastItem)

    const navigate = useNavigate()

    function Show(id: number) {
        phoneImg.find(e => e.id === id)
        navigate(`show/${id}`)
    }

    function NoRetryFunc() {
        setAlert(false)
    }

    function Delete (id : number) {
        setAlert(true)
        setIdItem (id)
    }

    function RetryFunc () {
        DeleteItem(idItem)
    }

    async function DeleteItem (id : number)  {
        console.log(id)
        await axios.delete(`https://test1.focal-x.com/api/items/${id}` , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })
        setAlert(false)
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('./')
        }
        else {
            axios.get('https://test1.focal-x.com/api/items', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    setPhoneImg(res.data)
                    axios.get(res.data[0].image_url)
                    .then(response => {
                        if (response.status===201) {
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

    useEffect(() => {
        if (searchPhone.trim() !== '') {
            const filteredImages = phoneImg.filter(image =>
                image.name.toLowerCase().includes(searchPhone.trim())
            )
            setPhoneImg(filteredImages)
        }
        else {
            setPhoneImg(phoneImg)
        }
    }, [searchPhone])

    return (
        <>
            <div className="FM-read">
                <div className="FM-search">
                    <img className="FM-search-icon" src={search} alt="search-icon" />
                    <input
                        type="search" placeholder="Search product by name"
                        onChange={(e) => {
                            setSearchPhone(e.target.value)
                        }}
                    />
                </div>
                <Link to={'add'} className="FM-add-btn FM-yellow-bg">ADD NEW PRODUCT</Link>
                <div className="FM-phone-images">
                    {currentItems && currentItems.length > 0 ? (
                        currentItems.map((image, index) => {
                                return (
                                    <div key={index} className="FM-phone-image-info">
                                        <img className="FM-phone-image" src={isLinkValid ? image.image_url : product} alt={`Phone ${index}`} />
                                        <div className="FM-phone-image-hover">
                                            <h3 onClick={() => Show(image.id)} className="FM-phones-name">{image.name}</h3>
                                            <div>
                                                <Link to={`edit/${image.id}`} className="FM-edit-btn FM-yellow-bg">Edit</Link>
                                                <button onClick={() => Delete(image.id)} className="FM-delete-btn">delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        ))
                        :
                        (
                            <p className="FM-handel">404 | No matching phones were found!!</p>
                        )
                    }
                </div>
                <div>
                    <ul className="pagination">
                        {[...Array(Math.ceil(phoneImg.length / itemsPerPage))].map((_, i) => (
                            <li key={i}>
                                <span onClick={() => setCurrentPage(i + 1)} className={i + 1 === currentPage ? 'active' : ''}>
                                    {i + 1}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {alert && <Alert
                msg={'Are you sure you want to delete the product?'}
                yesBTN="Yes"
                noBTN="No"
                RetryFunc={RetryFunc}
                NoRetryFunc={NoRetryFunc}
            />}
        </>
    )
}
