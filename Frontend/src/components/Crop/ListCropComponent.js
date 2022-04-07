import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CropService from '../../services/CropService'

const ListCropComponent = () => {
 
   const [crops, setCrops] = useState([])
   const [name, setName] = useState('')

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

    const searchCropsByName = () => {
        console.log(name);
        CropService.searchCropByName(name).then((response) => {
            console.log(response.data);
            setCrops(response.data)
        }).catch(error => {
            console.log(error);
        })
    }


    // const deleteCrop = (cropId) => {
    //     CropService.deleteCrop(cropId).then((response) => {
    //         getAllCrops();
    //     }).catch(error =>{
    //         console.log(error);
    //     })
    // }

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
                <button type="button" class="btn btn-outline-primary" onClick = {() => searchCropsByName()}>search</button>
            </div>
            <h2 className='text-center'>Crops Details</h2>
            <Link to = "/profile" className='btn btn-primary mb-2'>Back</Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <th style={{width:"18%"}}>Crop Image</th>
                    <th style={{width:"10%"}}>Crop Name</th>
                    <th style={{width:"10%"}}>Season</th>
                    <th>Description</th>
                    
                </thead>
                <tbody>
                    {
                        crops.map(
                            crop =>
                            <tr key = {crop.id}>
                                <td> <img src={`data:image/jpeg;base64,${crop.data}`} width="180" alt=" "/> </td>
                                <td> {crop.name} </td>
                                <td> {crop.season} </td>
                                <td> {crop.descr} </td>
                               
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListCropComponent