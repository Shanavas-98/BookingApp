const express = require('express');
const placeRouter = express.Router();
const userAuth = require('../middlewares/userAuth');
const { getAllPlaces, addPlace, editPlace, getPlace } = require('../controllers/placeControllers');

placeRouter.get('/', getAllPlaces)
placeRouter.get('/:placeId', getPlace)
placeRouter.post('/add', userAuth, addPlace)
placeRouter.put('/edit/:placeId', userAuth, editPlace)


module.exports = placeRouter;