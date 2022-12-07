import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://kwon-381db-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;