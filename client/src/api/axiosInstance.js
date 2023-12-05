import axios from 'axios'

const userInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

userInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config
  },
  (error) => {
    Promise.reject(error);
  }
)

userInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("interceptor",error);
    const { data } = error.response;
    if (data.name === 'TokenExpiredError') {
      // JWT token is expired, perform user logout
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userToken');
      // Redirect to the login page
      window.location.href = '/login';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export { userInstance }