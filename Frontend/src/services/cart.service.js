import axios from 'axios';

const API_URL = 'http://localhost:8082/cart/';

axios.interceptors.request.use( config => {
    const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken){
    const token = 'Bearer ' + user.accessToken;
    config.headers.Authorization =  token;
  }

  return config;
});

class CartService {

    async getAll() {
           return await axios.get(API_URL);
     }
     async get(id){
      return await axios.get(API_URL +`${id}`);
     }
     async update(data) {
      return await axios.put(API_URL,data);
     }
  
     async create (data)
     {
       return await axios.post('http://localhost:8082/cart/add',data);
     }
  
  async remove(id) {
     return await axios.delete(API_URL+ "delete/" + `${id}`); 
  }
  
  async removeall(id) {
    return await axios.delete(API_URL); 
  }
  }
  export default new CartService();
  