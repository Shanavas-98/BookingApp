/* eslint-disable no-undef */
import { userInstance } from "./axiosInstance";

export const register = (formData) => userInstance.post('/register', formData);
export const login = (formData) => userInstance.post('/login', formData);
export const getUser = () => userInstance.get('/auth-user')
export const addNewPlace = (formData) => userInstance.post('/add-place',formData)
export const uploadImages = (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return userInstance.post('/upload-images', formData, config)
}
export const deleteImage = (fileName) => userInstance.delete(`/delete-image/${fileName}`);
