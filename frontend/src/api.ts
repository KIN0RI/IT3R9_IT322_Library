import axios from 'axios';

const API = axios.create({
  baseURL: 'https://library-api-1oyn.onrender.com/api',
});

export default API;