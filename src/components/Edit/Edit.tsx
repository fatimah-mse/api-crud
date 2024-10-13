import FormComponent from "../FormComponent/FormComponent"
import axios from "axios"
import {useParams } from "react-router-dom"

export default function Edit() {
    
    const params = useParams()
    
    function handleSubmitEdit(name : string, price : string, img : string){
        console.log(name, price, img)
        axios.post(`https://test1.focal-x.com/api/items/${params.id}`, {
            _method : "PUT",
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
            console.log(res);
        })
        .catch(error => {
            console.error(error);
        });
        
        
    }

    return (
        <FormComponent
            title={'Edit NEW ITEM'}
            handleSubmit={handleSubmitEdit}
        />
    )
}
