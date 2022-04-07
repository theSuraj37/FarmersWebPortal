import axios from 'axios';

const API_URL = 'http://localhost:8082/api/order/';

axios.interceptors.request.use( config => {
    const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken){
    const token = 'Bearer ' + user.accessToken;
    config.headers.Authorization =  token;
  }

  return config;
});


class OrderService {
 
    async getAll(){
     return await axios.get(API_URL );
    }
    
    async getAllOrders(){
      return await axios.get(API_URL+'all');
     }

     async create(data) {
       return await axios.post(API_URL,data);
 }
 
  
 };
 
 
 export default new OrderService();
