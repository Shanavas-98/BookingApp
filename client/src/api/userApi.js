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

userInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken');
    if(userToken){
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config
  },
  (error) => {
    Promise.reject(error);
  }
)

export const register = (values) => userInstance.post('/register', values);
export const login = (values) => userInstance.post('/login', values);
export const getUser = () => userInstance.get('/auth-user')