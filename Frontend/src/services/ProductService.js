import axios from "axios";

const API_URL = 'http://localhost:8082/api/products/getall';


axios.interceptors.request.use( config => {
    const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken){
    const token = 'Bearer ' + user.accessToken;
    config.headers.Authorization =  token;
  }

  return config;
});

class ProductService {

    async getAllProducts() {
        return await axios.get('http://localhost:8082/api/products');
    }

    async getProductsById(prodId){
        return await axios.get(API_URL+'/getproductsbyid/' + `${prodId}`);
    }

    async searchProductByName(equipName){
        console.log(equipName);
        return await axios.get('http://localhost:8082/api/products/searchByName/'+`${equipName}`);
    }

    async updateProduct(prodId, updateBody) {
        return await axios.put(API_URL+'/updateproduct/' + `${prodId}`, updateBody);
    }

    async createProduct(formData) {
        return await axios.post(API_URL+'/addproducts', formData);
    }

    async deleteProduct(prodId) {
        return await axios.delete(API_URL+'/deleteproduct/' + `${prodId}`); 
     }

    async getProductsByCatId(catId)
    {
        return await axios.get('http://localhost:8082/api/products/category/'+`${catId}`);
    }

    // async addToCart(prodId)
    // {
    //     return await axios.put('http://localhost:8082/api/products/addToCart/'+`${prodId}`);
    // }
}

export default new ProductService();