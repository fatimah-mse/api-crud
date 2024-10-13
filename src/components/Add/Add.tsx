
import FormComponent from "../FormComponent/FormComponent"
import axios from "axios"

export default function Add() {

    function handleSubmitAdd(name : string, price : string, img : string){
        axios.post('https://test1.focal-x.com/api/items', {
            name: name,
            price: price,
            image: img
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            console.log(res)
            name = ''
            price = ''
            img = ''
        })
        .catch(error => {
            console.error(error)
        })
    }

    return (
        <FormComponent
            title={'ADD NEW ITEM'}
            handleSubmit={handleSubmitAdd}
        />
    )
}

