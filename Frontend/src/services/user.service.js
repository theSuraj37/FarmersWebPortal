import axios from 'axios';

const API_URL = 'http://localhost:8082/api/users';

axios.interceptors.request.use( config => {
    const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken){
    const token = 'Bearer ' + user.accessToken;
    config.headers.Authorization =  token;
  }

  return config;
});

class UserService {

    async getAllUsers() {
        return await axios.get(API_URL);
    }
};

export default new UserService();