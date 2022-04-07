import axios from "axios";

const API_URL = 'http://localhost:8082/api/equipments/getall';

axios.interceptors.request.use( config => {
    const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken){
    const token = 'Bearer ' + user.accessToken;
    config.headers.Authorization =  token;
  }

  return config;
});

class EquipmentService {

    async getAllEquipments() {
        return await axios.get('http://localhost:8082/api/equipments');
    }

    async getEquipmentsById(cropId){
        return await axios.get(API_URL+'/getequipmentsbyid/' + `${cropId}`);
    }

    
    async searchEquipmentByName(equipName){
        console.log(equipName);
        return await axios.get('http://localhost:8082/api/equipments/searchByName/'+`${equipName}`);
    }

    async updateEquipment(cropId, updateBody) {
        return await axios.put(API_URL+'/updateequipment/' + `${cropId}`, updateBody);
    }

    async createEquipments(formData) {
        return await axios.post(API_URL+'/addequipments', formData);
    }

    async deleteEquipment(cropId) {
        return await axios.delete(API_URL+'/deleteequipments/' + `${cropId}`); 
     }
}

export default new EquipmentService();