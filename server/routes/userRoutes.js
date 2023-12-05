const express = require('express');
const userRouter = express.Router();
const { register, login, authUser } =  require('../controllers/userControllers');
const upload = require('../utils/fileUpload');
const userAuth = require('../middlewares/userAuth');
const { uploadImages, deleteImage, getUserPlaces, getPlace } = require('../controllers/placeControllers');

userRouter.post('/register', register )
userRouter.post('/login', login)
userRouter.get('/auth-user', authUser)

userRouter.post('/upload-images', userAuth, upload.array('images',10), uploadImages)
userRouter.delete('/delete-image/:fileName', userAuth, deleteImage)

userRouter.get('/user-places', userAuth, getUserPlaces)
userRouter.get('/user-places/:placeId', userAuth, getPlace)

module.exports = userRouter;