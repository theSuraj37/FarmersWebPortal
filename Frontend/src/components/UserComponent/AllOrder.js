import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import orderService from "../../services/order.service";

const AllOrder = () =>{

    const [order, setOrder] = useState([])

    useEffect(() => {
        getAllOrder()
    },[])

    const getAllOrder = () =>{
       
        orderService.getAllOrders().then((response) => {
            setOrder(response.data);
            console.log(response.data)
        }).catch(error => {
            console.log(error);
        })
        
    }


        return(
            <div>
            <br /><br />
            <div className="container border bg-light text-dark" style={{maxWidth:"1080px"}}>
            <br />
            <h2 className='text-center'>Order History</h2>
            <Link to = "/profile" className='btn btn-primary mb-2'>Back</Link>
          
           
            <table className='table table-bordered table-striped'style={{width:"90%", marginLeft:"auto", marginRight:"auto"}}>
                <thead> 
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Zipcode</th>
                    <th>State</th>
                    <th>Price</th>
                    <th>Payment Mode</th>
                </thead>
                <tbody>
                   {
                       order.map(
                           order => 
                           <tr key = {order.id}>
                               <td> { order.name} </td>
                               <td> { order.email} </td>
                               <td> { order.mobileno} </td>
                               <td> { order.address} </td>
                               <td> { order.city} </td>
                               <td> { order.zipcode} </td>
                               <td> { order.state} </td>
                               <td> { order.price} </td>
                               <td> { order.paymentmode} </td>
                           </tr>
                       )
                   }
                </tbody>
            </table>
           </div>
            </div>
        )
    }

 export default AllOrder;
