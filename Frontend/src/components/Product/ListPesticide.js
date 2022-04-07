import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductService from '../../services/ProductService'

const ListPesticide = () => {
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')


    useEffect(() => {
        getAllPesticides();
    },[])

    const getAllPesticides = () => {
        ProductService.getProductsByCatId(4).then((response) => {
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
            <h2 className='text-center'>Pesticide Details</h2>
            <Link to = "/profile" className='btn btn-primary mb-2'>Back</Link>
            <table className='table table-bordered table-striped'>
            <thead>
                    <th>Pesticide Name</th>
                    <th>Pesticide Image</th>
                    <th>Pesticide Description</th>
                    <th>Pesticide Price</th>
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

export default ListPesticide