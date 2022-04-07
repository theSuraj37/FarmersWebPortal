import axios from "axios";

const API_URL = 'http://localhost:8082/api/crops/getall';


axios.interceptors.request.use( config => {
    const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken){
    const token = 'Bearer ' + user.accessToken;
    config.headers.Authorization =  token;
  }

  return config;
});

class CropService {

    async getAllCrops() {
        return await axios.get('http://localhost:8082/api/crops');
    }

    async getCropsById(cropId){
        return await axios.get(API_URL+'/getcropsbyid/' + `${cropId}`);
    }

    async searchCropByName(cropName){
        return await axios.get('http://localhost:8082/api/crops/searchByName/'+`${cropName}`);
    }

    async updateCrop(cropId, updateBody) {
        return await axios.put(API_URL+'/updatecrop/' + `${cropId}`, updateBody);
    }

    async createCrop(formData) {
        return await axios.post(API_URL+'/addcrops', formData);
    }

    async deleteCrop(cropId) {
        return await axios.delete(API_URL+'/deletecrop/' + `${cropId}`); 
     }
}

export default new CropService();