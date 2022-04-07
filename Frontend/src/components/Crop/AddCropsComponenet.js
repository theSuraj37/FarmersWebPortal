import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory , useParams} from 'react-router-dom'
import CropService from '../../services/CropService'

const AddCropsComponenet = () => {

    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [descr, setDescr] = useState('')
    const [season, setSeason] = useState('')
    const cat_id = 1
    const category = {cat_id}
    const history = useHistory();
    let {cropsData} = useParams();
    let {updateCrops} = useParams(); 
    const {id} = useParams();

const saveOrUpdateCrop = (e) => {
    e.preventDefault();
    console.log(category);
    const crops = {name,descr,season}
    cropsData = JSON.stringify(crops)

    const CropsUpdate = {name, descr, season}
    updateCrops = JSON.stringify(CropsUpdate)

    var bodyFormData = new FormData();

    console.log(img);

    bodyFormData.append('cropdata',cropsData);
    bodyFormData.append('CropImage', img);

    var updateBody = new FormData();

    updateBody.append('CropDto',updateCrops);
    updateBody.append('cropImg',img);


    if(id){
        console.log("UPDATE CROP")
        CropService.updateCrop(id,updateBody).then((response) => {
            history.push('/crops')
        }).catch(error => {
            console.log(error)
        })
    }
    else{
        
        // console.log(cropsData)
        // console.log(img)
    CropService.createCrop(bodyFormData).then((response) =>{
        console.log(response.data)

        history.push('/crops');
    }).catch(error => {
        console.log(error)
    })
    }

}

    useEffect(()=> {
        CropService.getCropsById(id).then((response) => {
            setName(response.data.name)
            setImg(response.data.img)
            setDescr(response.data.descr)
            setSeason(response.data.season)
        }).catch(error => {
            console.log(error)
        })
    },[id])

    const title = () => {
        if(id){
            return <h2 className='text-center'>Update Crop</h2>
        }else
        {
            return <h2 className='text-center'>Add Crop</h2>
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
                                    <label className = "form-label"> Season :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Season"
                                        name = "Season"
                                        className = "form-control"
                                        value = {season}
                                        onChange = {(e) => setSeason(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <button className = "btn btn-success" onClick = {(e) => saveOrUpdateCrop(e)} >Submit </button>
                                <Link to="/crops" className="btn btn-danger" style = {{marginLeft:"10px"}}> Cancel </Link>
                            </form>

                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddCropsComponenet