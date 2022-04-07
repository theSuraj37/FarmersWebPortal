import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import ProductService from '../../services/ProductService'

const AddProducts = () => {

    const [name, setName] = useState('')
    const [image, setImg] = useState('')
    const [descr, setDescr] = useState('')
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    let [id, setCat_id] = useState(0)
    id = parseInt(id);
    const category = {id}

    const history = useHistory();
    let {productData} = useParams();
    let {updateProduct} = useParams();

    const {prodId} = useParams();


    const saveOrUpdateProdcut = (e) => {
        e.preventDefault();
        console.log(id);
        console.log(category);
        const products = {name, descr, qty, price, category}
        
        productData = JSON.stringify(products)

        const ProductUpdate = {name, descr, qty, price}
        updateProduct = JSON.stringify(ProductUpdate)

        var bodyFormData = new FormData();

        bodyFormData.append('productdata', productData);
        bodyFormData.append('ProductImage',image);

        var updateBody = new FormData();

        updateBody.append('ProductDto', updateProduct);
        updateBody.append('productImg',image);
        
        if(prodId)
        {
            console.log("UPDATE Product")
            ProductService.updateProduct(prodId,updateBody).then((response) => {
                history.push('/products')
            }).catch(error => {
                console.log(error)
            })
        }
        else{
            ProductService.createProduct(bodyFormData).then((response) => {
              console.log(response.data)
                history.push('/products')
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(()=> {
        console.log(prodId);
        ProductService.getProductsById(prodId).then((response)=> {
            setName(response.data.name)
            setImg(response.data.image)
            setDescr(response.data.descr)
            setQty(response.data.qty)
            setPrice(response.data.price)
        }).catch(error => {
            console.log(error)
        })
    },[prodId])

    const title = () => {
        if(prodId){
            return <h2 className='text-center'>Update Product</h2>
        }else
        {
            return <h2 className='text-center'>Add Product</h2>
        }
    }

    return (
        <div>
            <br /><br />
            <div className = 'container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    title()
                }
                 <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Name"
                                        name = "Name"
                                        className = "form-control"
                                        value = {name}
                                        onChange = {(e) => setName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Image :</label>
                                    <input
                                        type = "file"
                                        placeholder = "Enter Image"
                                        name = "Image"
                                        className = "form-control"
                                        files = {image}
                                        onChange = {(e) => setImg(e.target.files[0])}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Description :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Desciption"
                                        name = "Description"
                                        className = "form-control"
                                        value = {descr}
                                        onChange = {(e) => setDescr(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Quantity :</label>
                                    <input
                                        type = "number"
                                        placeholder = "Enter Quantity"
                                        name = "Quantity"
                                        className = "form-control"
                                        value = {qty}
                                        onChange = {(e) => setQty(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Price :</label>
                                    <input
                                        type = "number"
                                        placeholder = "Enter Price"
                                        name = "Price"
                                        className = "form-control"
                                        value = {price}
                                        onChange = {(e) => setPrice(e.target.value)}
                                    >
                                    </input>
                                </div>


                                <div className='form-group mb-2 dropdown'>
                                    
                                    <label className='form-lable'> Choose Category: &emsp;</label>
                                    <select id='mySelect' onChange={(e) => setCat_id(e.target.value)}>
                                    <option>Select</option>
                                    <option value="4">Pesticide</option>
                                    <option value="3">Insecticide</option>
                                    </select>
                                </div>

                                <button className = "btn btn-success" onClick = {(e) => saveOrUpdateProdcut(e)} >Submit </button>
                                <Link to="/products" className="btn btn-danger" style = {{marginLeft:"10px"}}> Cancel </Link>
                            </form>

                        </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AddProducts