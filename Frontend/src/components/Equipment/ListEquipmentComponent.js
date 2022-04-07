import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EquipmentService from '../../services/EquipmentService'

const ListEquipmentComponent = () => {
 
    const [equipments, setEquipments] = useState([])
    const [name, setName] = useState('')
 
     useEffect(() => {
             getAllEquipments();
 
     }, [])

     const getAllEquipments = () => {
        EquipmentService.getAllEquipments().then((response) => {
            setEquipments(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const searchEquipmentByName = () => {
        console.log(name);
        EquipmentService.searchEquipmentByName(name).then((response) => {
            console.log(response.data);
            setEquipments(response.data)
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
                <button type="button" class="btn btn-outline-primary" onClick = {() => searchEquipmentByName()}>search</button>
            </div>
            <h2 className='text-center'>Equipment Details</h2>
            <Link to = "/profile" className='btn btn-primary mb-2'>Back</Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <th>Equipment Name</th>
                    <th>Equipment Image</th>
                    <th>Equipment Description</th>
                    <th>Equipment Price</th>
                </thead>
                <tbody>
                    {
                        equipments.map(
                            equipments =>
                            <tr key = {equipments.id}>
                                <td> {equipments.name} </td>
                                <td> <img src={`data:image/jpeg;base64,${equipments.data}`} width="150" alt=" "/>  </td>
                                <td> {equipments.descr} </td>
                                <td> {equipments.price} </td>
                               
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEquipmentComponent