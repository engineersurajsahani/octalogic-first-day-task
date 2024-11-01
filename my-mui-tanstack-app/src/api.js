import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://employee-api-using-nodejs.onrender.com/', 
});
