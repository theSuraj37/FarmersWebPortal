import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory , useParams} from 'react-router-dom'
import EquipmentService from '../../services/EquipmentService'

const AddEquipmentComponent = () => {

    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [descr, setDescr] = useState('')
    const [price, setPrice] = useState(0)
    const history = useHistory();
    let {equipmentsData} = useParams();
    let {updateEquipments} = useParams();
    const {id} = useParams();

const saveOrUpdateEquipment = (e) => {
    e.preventDefault();
    const equipment = {name,descr,price}
    equipmentsData = JSON.stringify(equipment)

    const EquipmentsUodate = {name, descr, price}
    updateEquipments = JSON.stringify(EquipmentsUodate)

    var bodyFormData = new FormData();

    console.log(img);

    bodyFormData.append('equipmentdata',equipmentsData);
    bodyFormData.append('EquipmentImage', img);

    var updateBody = new FormData();

    updateBody.append('EquipDto',updateEquipments);
    updateBody.append('equipImg',img);

    if(id){
        EquipmentService.updateEquipment(id,updateBody).then((response) => {
            history.push('/equipments')
        }).catch(error => {
            console.log(error)
        })
    }
    else{
        
        EquipmentService.createEquipments(bodyFormData).then((response) =>{
            console.log(response.data)
    
            history.push('/equipments');
        }).catch(error => {
            console.log(error)
        })
        }

}

useEffect(()=> {
    EquipmentService.getEquipmentsById(id).then((response) => {
        setName(response.data.name)
        setImg(response.data.img)
        setDescr(response.data.descr)
        setPrice(response.data.price)
    }).catch(error => {
        console.log(error)
    })
},[id])

const title = () => {
    if(id){
        return <h2 className='text-center'>Update Equipment</h2>
    }else
    {
        return <h2 className='text-center'>Add Equipment</h2>
    }
}

return (
    <div>
        <br /><br />
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    title()
                }
                <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Name"
                                        name = "Name"
                                        className = "form-control"
                                        value = {name}
                                        onChange = {(e) => setName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                <label className = "form-label"> Image :</label>
                                    <input
                                        type = "file"
                                        placeholder = "Enter Image"
                                        name = "Image"
                                        className = "form-control"
                                        files = {img}
                                        onChange = {(e) => setImg(e.target.files[0])}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Description :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Desciption"
                                        name = "Description"
                                        className = "form-control"
                                        value = {descr}
                                        onChange = {(e) => setDescr(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Range :</label>
                                    <input
                                        type = "number"
                                        placeholder = "Enter Range"
                                        name = "Price"
                                        className = "form-control"
                                       
                                        value = {price}
                                        onChange = {(e) => setPrice((e.target.value))}
                                    >
                                    </input>
                                </div>

                                <button className = "btn btn-success" onClick = {(e) => saveOrUpdateEquipment(e)} >Submit </button>
                                <Link to="/equipments" className="btn btn-danger" style = {{marginLeft:"10px"}}> Cancel </Link>
                            </form>

                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddEquipmentComponent