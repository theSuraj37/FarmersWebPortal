import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductService from '../../services/ProductService';

const ListInsecticide = () => {

    const [products, setProducts] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        getAllInsecticides();
    },[])

    const getAllInsecticides = () => {
        ProductService.getProductsByCatId(3).then((response) => {
            setProducts(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const searchProductByName = () => {
        console.log(name);
        ProductService.searchProductByName(name).then((response) => {
            console.log(response.data);
            setProducts(response.data)
        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <div className='container'>
             <br />
            <div class="input-group w-25">
                <input 
                    type="search" 
                    class="form-control rounded" 
                    placeholder="Search" 
                    aria-label="Search" 
                    aria-describedby="search-addon"
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}
                />
                <button type="button" class="btn btn-outline-primary" onClick = {() => searchProductByName()}>search</button>
            </div>
            <h2 className='text-center'>Insecticide Details</h2>
            <Link to = "/profile" className='btn btn-primary mb-2'>Back</Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <th>Insecticide Name</th>
                    <th>Insecticide Image</th>
                    <th>Insecticide Description</th>
                    <th>Insecticide Price</th>
                </thead>
                <tbody>
                    {
                       products.map(
                        products =>
                        <tr key = {products.prodId}>
                            <td> {products.name} </td>
                            <td> <img src={`data:image/jpeg;base64,${products.data}`} width="150" alt=" "/>  </td>
                            <td> {products.descr} </td>
                            <td> {products.price} </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )

}   

export default ListInsecticide
