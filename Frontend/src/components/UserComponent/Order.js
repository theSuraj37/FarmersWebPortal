import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import cartService from '../../services/cart.service'
import orderService from '../../services/order.service'

const Order = () => {

    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[mobileno, setMobileno] = useState('')
    const[address, setAddress] = useState('')
    const[city, setCity] = useState('')
    const[zipcode, setZipcode] = useState('')
    const[state, setState] = useState('')
    const[paymentmode, setPaymentmode] = useState('')
    let[price, setPrice] = useState(0)

    const history = useHistory();
    const{totalCost} = useParams();
       
    if(totalCost<=0)
    {
        alert("Your Cart is Empty... Please Add items into cart.")
        history.push("/profile")
    }

    console.log("Total Cost is "+totalCost);

    const PlaceOrder = (e) => {
        e.preventDefault();
        price = totalCost;
        console.log("Price is" + price)
        const place = {name, email, mobileno, address, city, zipcode, state,paymentmode,price}
        
        orderService.create(place).then((response) => {
            console.log(response.data)
        })

        alert("Congratulations...!!! Your Order Has Been Placed Successfully..")
        history.push("/profile")
        cartService.removeall().then(() => {
            
        })
        // cartService.removeall().then((response) => {
           
        // })
    
    }

    


    return (
        <div>
            <br /><br />
            <div className = 'container border bg-info text-white' style={{maxWidth:"980px", textAlign:"center"}}>
            <br />
            <h2>Enter Delivery Details</h2>
            <div className='row'>
                 <div className = "card-body">
                    
                            <form>
                                <tr>
                                    <td style={{padding:"10px"}}>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Name :</label>
                                    <input
                                        style={{width:"300px"}}
                                        type = "text"
                                        placeholder = "Enter Name"
                                        name = "Name"
                                        className = "form-control"
                                        value = {name}
                                        onChange = {(e) => setName(e.target.value)}
                                    >
                                    </input>
                                </div>
                                </td>
                                <td >
                                <div className = "form-group mb-2">
                                    <label className = "form-label">Email :</label>
                                    <input
                                    style={{width:"300px"}}
                                        type = "text"
                                        placeholder = "Enter Email"
                                        name = "Email"
                                        className = "form-control"
                                        value = {email}
                                        onChange = {(e) => setEmail(e.target.value)}
                                    >
                                    </input>
                                </div>
                                </td>
                                    <td style={{padding:"10px"}}>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Mobile :</label>
                                    <input
                                    style={{width:"300px"}}
                                        type = "text"
                                        placeholder = "Enter Mobile"
                                        name = "Mobile"
                                        className = "form-control"
                                        value = {mobileno}
                                        onChange = {(e) => setMobileno(e.target.value)}
                                    >
                                    </input>
                                </div>
                                </td>
                                </tr>
                                <tr>
                                <td style={{padding:"10px"}}>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Address :</label>
                                    <input
                                    style={{width:"300px"}}
                                        type = "text"
                                        placeholder = "Enter Address"
                                        name = "Address"
                                        className = "form-control"
                                        value = {address}
                                        onChange = {(e) => setAddress(e.target.value)}
                                    >
                                    </input>
                                </div>
                                </td>
                                    <td>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> City :</label>
                                    <input
                                    style={{width:"300px"}}
                                        type = "text"
                                        placeholder = "Enter City"
                                        name = "City"
                                        className = "form-control"
                                        value = {city}
                                        onChange = {(e) => setCity(e.target.value)}
                                    >
                                    </input>
                                </div>
                                </td>
                                <td style={{padding:"10px"}}>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Zipcode :</label>
                                    <input
                                    style={{width:"300px"}}
                                        type = "text"
                                        placeholder = "Enter Zipcode"
                                        name = "Zipcode"
                                        className = "form-control"
                                        value = {zipcode}
                                        onChange = {(e) => setZipcode(e.target.value)}
                                    >
                                    </input>
                                </div>
                                </td>
                                </tr>

                                <tr>
                                    <td style={{padding:"10px"}}>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> State :</label>
                                    <input
                                    style={{width:"300px"}}
                                        type = "text"
                                        placeholder = "Enter Address"
                                        name = "state"
                                        className = "form-control"
                                        value = {state}
                                        onChange = {(e) => setState(e.target.value)}
                                    >
                                    </input>
                                </div>
                                </td>
                                <td>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Price :</label>
                                    <input
                                    style={{width:"300px"}}
                                        type = "text"
                                        placeholder = "Enter Price"
                                        name = "price"
                                        className = "form-control"
                                        value = {totalCost}
                                        onChange = {(e) => setPrice(e.target.value)}
                                    >
                                    </input>
                                </div>
                                </td>
                                <td style={{padding:"10px"}}>
                                <div className='form-group mb-2 dropdown'>
                                    
                                    <label className='form-lable'> Payment Mode: &emsp;</label>
                                    <select id='mySelect' onChange={(e) => setPaymentmode(e.target.value)}>
                                    <option>Select</option>
                                    <option value="CASH_ON_DELIVERY">CASH_ON_DELIVERY</option>
                                    <option value="3">CARD</option>
                                    </select>
                                </div>
                                </td>
                                </tr>

                                <button className = "btn btn-warning" onClick = {(e) => PlaceOrder(e)} >Place Order </button>
                                <Link to="/profile" className="btn btn-danger" style = {{marginLeft:"10px"}}> Cancel </Link>
                                
                            </form>
                            
                        </div>
                </div>
            </div>
        </div>
    
    )
}

export default Order