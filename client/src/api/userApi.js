/* eslint-disable no-undef */
import { userInstance } from "./axiosInstance";

//user api calls
export const register = (formData) => userInstance.post('/register', formData);
export const login = (formData) => userInstance.post('/login', formData);
export const getUser = () => userInstance.get('/auth-user')
export const fetchUserPlaces = () => userInstance.get('/user-places')
export const fetchPlaceData = (placeId) => userInstance.get(`/user-places/${placeId}`)

//image api calls
export const uploadImages = (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return userInstance.post('/upload-images', formData, config)
}
export const deleteImage = (fileName) => userInstance.delete(`/delete-image/${fileName}`);

//places api calls
export const addNewPlace = (formData) => userInstance.post('/places/add',formData)
export const editPlace = (placeId,formData) => userInstance.put(`/places/edit/${placeId}`,formData)
export const fetchAllPlaces = () => userInstance.get('/places')
export const fetchPlace = (placeId) => userInstance.get(`/places/${placeId}`)
