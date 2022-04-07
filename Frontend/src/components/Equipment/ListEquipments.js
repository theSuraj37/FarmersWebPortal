import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EquipmentService from '../../services/EquipmentService'

const ListEquipmentComponent = () => {
 
    const [equipments, setEquipments] = useState([])
 
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

    const deleteEquipment = (equipmentId) => {
        EquipmentService.deleteEquipment(equipmentId).then((response) => {
            getAllEquipments();
        }).catch(error =>{
            console.log(error);
        })
    }
 
    return (
        <div className='container'>
            <h2 className='text-center'>Equipment Details</h2>
            <Link to = "/add-equipment" className='btn btn-primary mb-2'>Add Equipment</Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <th>Equipment ID</th>
                    <th>Equipment Name</th>
                    <th>Equipment Image</th>
                    <th>Equipment Description</th>
                    <th>Equipment Price</th>
                    <th  style={{width:"20%"}}>Actions</th>
                </thead>
                <tbody>
                    {
                        equipments.map(
                            equipments =>
                            <tr key = {equipments.id}>
                                <td> {equipments.id} </td>
                                <td> {equipments.name} </td>
                                <td> <img src={`data:image/jpeg;base64,${equipments.data}`} width="150" alt=" "/>  </td>
                                <td> {equipments.descr} </td>
                                <td> {equipments.price} </td>
                                <td>
                                    <Link className='btn btn-info' to = {`/edit-equipments/${equipments.id}`}>Update</Link>
                                    <button className='btn btn-danger' onClick = {() => deleteEquipment(equipments.id)}
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

export default ListEquipmentComponent