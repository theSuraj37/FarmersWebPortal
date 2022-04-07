import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CropService from '../../services/CropService'

const ListCropComponent = () => {
 
   const [crops, setCrops] = useState([])

    useEffect(() => {
            getAllCrops();

    }, [])

    

    const getAllCrops = () => {
        CropService.getAllCrops().then((response) => {
            setCrops(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteCrop = (cropId) => {
        CropService.deleteCrop(cropId).then((response) => {
            getAllCrops();
        }).catch(error =>{
            console.log(error);
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center'>Crops Details</h2>
            <Link to = "/add-crops" className='btn btn-primary mb-2'>Add Crops</Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <th>Crop ID</th>
                    <th>Crop Name</th>
                    <th>Crop Image</th>
                    <th>Crop Description</th>
                    <th>Crop Season</th>
                    <th  style={{width:"20%"}}>Actions</th>
                </thead>
                <tbody>
                    {
                        crops.map(
                            crop =>
                            <tr key = {crop.id}>
                                <td> {crop.id} </td>
                                <td> {crop.name} </td>
                                <td> <img src={`data:image/jpeg;base64,${crop.data}`} width="150" alt=" "/> </td>
                                <td> {crop.descr} </td>
                                <td> {crop.season} </td>
                                <td>
                                    <Link className='btn btn-info' to = {`/edit-crops/${crop.id}`}>Update</Link>
                                    
                                    {/* <button className='btn btn-danger' onClick = {() => deleteCrop(crop.id)}
                                    style = {{marginLeft:"10px"}}>Delete</button> */}
                                     <button className='btn btn-danger' onClick = {() => deleteCrop(crop.id)}
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

export default ListCropComponent