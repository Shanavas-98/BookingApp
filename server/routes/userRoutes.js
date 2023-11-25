const express = require('express');
const userRouter = express.Router();
const { register, login, authUser } =  require('../controllers/userControllers')

userRouter.post('/register', register )
userRouter.post('/login', login)
userRouter.get('/auth-user', authUser)

module.exports = userRouter;