/* eslint-disable no-undef */
import axios from 'axios';
const serverUrl = import.meta.REACT_APP_SERVER_URL;

const adminInstance = axios.create({
    baseURL: `${serverUrl}/admin`,
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
    },
});

console.log(adminInstance);