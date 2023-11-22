/* eslint-disable no-undef */
import axios from 'axios'
console.log(import.meta.env.REACT_APP_SERVER_URL);

const userInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = (values) => userInstance.post('/register', values);
export const login = (values) => userInstance.post('/login', values);