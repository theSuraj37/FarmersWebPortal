import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import userService from "../../services/user.service";

const AllUsers = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers()
    },[])

    const getAllUsers = () => {

        userService.getAllUsers().then((response) => {
            setUsers(response.data);
        }).catch(error => {
            console.log(error);
        })
    } 
    
    return(
        <div>
        <br /><br />
        <div className="container border bg-light text-dark" style={{maxWidth:"450px"}}>
        <br />
        <h2 className='text-center'>Registered Users</h2>
        <Link to = "/profile" className='btn btn-primary mb-2'>Back</Link>
      
       
        <table className='table table-bordered table-striped'style={{width:"90%", marginLeft:"auto", marginRight:"auto"}}>
            <thead> 
                <th>Name</th>
                <th>Email</th>
            </thead>
            <tbody>
               {
                   users.map(
                       users => 
                       <tr key = {users.id}>
                           <td> { users.username} </td>
                           <td> { users.email} </td>
                       </tr>
                   )
               }
            </tbody>
        </table>
       </div>
        </div>
    )
}

export default AllUsers;