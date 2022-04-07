import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductService from '../../services/ProductService'

const ListProducts = () => {
    
   const [products, setProducts] = useState([])
   
    useEffect(() => {
        getAllProducts();
    },[])

    const getAllProducts= () => {
        ProductService.getAllProducts().then((response) => {
            setProducts(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteProducts = (productId) => {
       ProductService.deleteProduct(productId).then((response)=> {
           getAllProducts();
       }).catch(error =>{
        console.log(error);
    })
       
    }    

    return (
            <div className = 'container'>
           <h2 className='text-center'>Products Details</h2>
            <Link to = "/add-product" className='btn btn-primary mb-2'>Add Product</Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Image</th>
                    <th>Product Description</th>
                    <th>Product Price</th>
                    <th>Product Qty</th>
                    <th  style={{width:"20%"}}>Actions</th>
                </thead>
                <tbody>
                    {
                        products.map(
                            products =>
                            <tr key = {products.prodId}>
                                <td> {products.prodId} </td>
                                <td> {products.name} </td>
                                <td> <img src={`data:image/jpeg;base64,${products.data}`} width="150" alt=" "/>  </td>
                                <td> {products.descr} </td>
                                <td> {products.price} </td>
                                <td> {products.qty} </td>
                                <td>
                                    <Link className='btn btn-info' to = {`/edit-products/${products.prodId}`}>Update</Link>
                                    <button className='btn btn-danger' onClick = {() => deleteProducts(products.prodId)}
                                    style = {{marginLeft:"10px"}}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListProducts;