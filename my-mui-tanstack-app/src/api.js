import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://employee-api-using-nodejs.onrender.com/', 
});

export const  studentapi = axios.create({
  baseURL: 'https://student-api-using-nodejs.onrender.com/', 
});
