import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import cartService from "../../services/cart.service";

const Cart = () =>{
    
    const [products, setProducts] = useState([])
    const [totalCost, setTotalCost] = useState([])
    const [qty, setQty] = useState(0)

    useEffect(() => {
        getAllCart()
    },[])

    const getAllCart = () =>{
        cartService.getAll().then((response) => {
            setProducts(response.data.cartItems)
            setTotalCost(response.data.totalcost)
            console.log( response)

        }).catch(error => {
            console.log(error);
        })
    }


    const DeleteFromCart = (cartId) =>{
        console.log(cartId)
        const pdacartItemIdta = cartId 
        cartService.remove(pdacartItemIdta).then((response) => {
            getAllCart()
        })
    }

    const DeleteAll = () => {
        cartService.removeall().then((response) => {
            alert("All Items Removed")
            getAllCart()
        })
    }

    const UpdateCart = (id,product_id) => {

        const update = {id, product_id, qty}

        cartService.update(update).then((response) => {
            // alert("Item Updated")
            getAllCart()
        })
    }

   

        return(
            <div>
            <br /><br />
            <div className="container border bg-light text-dark" style={{maxWidth:"980px"}}>
            <h2 className='text-center'>Items in the Cart</h2>
            <Link to = "/profile" className='btn btn-primary mb-2'>Back</Link>
          
           
            <table className='table table-bordered table-striped'style={{width:"80%", marginLeft:"auto", marginRight:"auto"}}>
                <thead> 
                    <th>Name</th>
                    <th>Per Item(Rs.)</th>
                    <th>Quantity</th>
                    <th>Update</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {
                       products.map(
                        products =>
                        <tr key = {products.id}>
                            <td> {products.product.name} </td>
                            <td> {products.product.price} </td>
                            <td> {products.quantity} </td>
                            <td> 

                            <input
                                        type = "number"
                                        placeholder = "Qty"
                                        name = "qty"
                                        className = "form-control"
                                        required
                                        style={{width:"70px"}}
                                        onChange = {(e) => setQty(e.target.value)}
                                    >
                            </input>
                                
                            </td>    
                            
                            <td>
                            
                            <button className='btn btn-warning' onClick = {() => UpdateCart(products.id, products.product.prodId)}
                                   >Update</button>
                           
                            <button className='btn btn-danger' onClick = {() => DeleteFromCart(products.id)}
                                   style = {{marginLeft:"20px"}}  >Delete</button>
                            
                            </td>

                            
                            </tr>
                        )
                    }
                </tbody>
            </table>
                    <br></br>
            <table style={{width:"50%", marginLeft:"auto", marginRight:"auto"}}>
           
            <thead> 
                    <th style={{width:"50%"}}></th>
                    <th></th>
                    <th></th>
                </thead>
              <tbody>
               <tr>
                   <td>
                <h3 style={{textAlign:"center", color:"green"}}>Total Cost : {totalCost}</h3>
                </td>
                <td>

               
                <Link to = 
                {`/order/${totalCost}`} className='btn btn-primary mb-2'>Place Order</Link>
                {/* <button className='btn btn-success' onClick = {() => PlaceOrder()}
                                    >Place Order</button> */}
</td>
                <td>
                <button className='btn btn-danger'  onClick = {() => DeleteAll()}>Remove All</button>

                </td>
                </tr>
                </tbody>
            </table>
            </div>
            </div>
        )
    }

 export default Cart;
