const express = require('express');
const userRouter = express.Router();
const { register, login, authUser } =  require('../controllers/userControllers');
const upload = require('../utils/fileUpload');
const userAuth = require('../middlewares/userAuth');
const { uploadImages, deleteImage, addPlace } = require('../controllers/placeController');

userRouter.post('/register', register )
userRouter.post('/login', login)
userRouter.get('/auth-user', authUser)

userRouter.post('/upload-images', userAuth, upload.array('images',10), uploadImages)
userRouter.delete('/delete-image/:fileName', userAuth, deleteImage)
userRouter.post('/add-place', userAuth, addPlace)
userRouter.get('/places',getPlaces)

module.exports = userRouter;