const fs = require('fs').promises;
const PlaceModel = require("../models/placeModel");

const uploadImages = async (req, res) => {
    try {
        const files = req.files?.map((item) => (item.filename))
        res.status(200).json(files)
    } catch (error) {
        console.log("upload image", error);
        res.status(error.status || 500).json({
            name: error.name || 'Internal Server Error',
            message: error.message || 'Something went wrong on the server.',
            stack: error.stack
        });
    }
}

const deleteImage = async (req, res) => {
    try {
        const { fileName } = req.params;
        if(!fileName){
            throw { status: 400, message: 'file name is required' };
        }
        // Specify the path where your images are stored
        const imagePath = `./uploads/${fileName}`;
        // Check if the file exists
        await fs.access(imagePath);
        // Delete the file
        await fs.unlink(imagePath);

        res.status(200).json({ message: 'Image deleted successfully.' });
    } catch (error) {
        console.log('Error deleting image', error);
        if (error.code === 'ENOENT') {
            console.log('File not found!');
        }
        res.status(error.status || 500).json({
            name: error.name || 'Internal Server Error',
            message: error.message || 'Something went wrong on the server.',
            stack: error.stack
        });
    }
}

const addPlace = async (req, res) => {
    try {
        const userId = req.userId
        const { title, building, locality, street,
            town, district, state, pincode, rent, uploaded,
            cover,description, beds, bedrooms,
            bathrooms, facilities, perks,
            checkin, checkout, guests } = req.body;
        const newPlace = await PlaceModel.create({
            owner: userId,
            title: title,
            building: building, 
            locality: locality, 
            street: street,
            town: town, 
            district: district, 
            state: state, 
            pincode: pincode,
            rent: rent,
            photos: uploaded,
            cover: cover || uploaded[0],
            description: description,
            beds: beds,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            facilities: facilities,
            perks: perks,
            checkIn: checkin,
            checkOut: checkout,
            guests: guests
        })
        res.status(200).json({ success: true, message: "place added successfully" })
    } catch (error) {
        console.log("add place", error);
        res.status(error.status || 500).json({
            name: error.name || 'Internal Server Error',
            message: error.message || 'Something went wrong on the server.',
            stack: error.stack
        });
    }
}

const editPlace = async (req, res) => {
    try {
        const userId = req.userId
        const placeId = req.params.placeId
        if(!placeId){
            throw { status: 400, message: 'place id is required' };
        }
        const { title, building, locality, street,
            town, district, state, pincode, rent, uploaded,
            cover, description, beds, bedrooms,
            bathrooms, facilities, perks,
            checkin, checkout, guests } = req.body;
        if(!title || !address || !rent || !checkin || !checkout){
            throw { status: 400, message: 'all form fields marked * are required' };
        }
        const placeDoc = await PlaceModel.findById(placeId);
        if (placeDoc.owner.toString() !== userId) {
            throw { status: 403, message: "You are not the owner of this place" };
        }
        const editedPlace = await placeDoc.set(
        {
            title: title,
            building: building, 
            locality: locality, 
            street: street,
            town: town, 
            district: district, 
            state: state, 
            pincode: pincode,
            rent: rent,
            photos: uploaded,
            cover: cover,
            description: description,
            beds: beds,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            facilities: facilities,
            perks: perks,
            checkIn: checkin,
            checkOut: checkout,
            guests: guests
        }).save();
        console.log(editedPlace);
        res.status(200).json({ success: true, message: "place edited successfully" })
    } catch (error) {
        console.log("add place", error);
        res.status(error.status || 500).json({
            name: error.name || 'Internal Server Error',
            message: error.message || 'Something went wrong on the server.',
            stack: error.stack
        });
    }
}

const getUserPlaces = async (req, res) => {
    try {
        const userId = req.userId;
        const places = await PlaceModel.find({ owner: userId });
        res.status(200).json(places)
    } catch (error) {
        console.log('get user places', error);
        res.status(error.status || 500).json({
            name: error.name || 'Internal Server Error',
            message: error.message || 'Something went wrong on the server.',
            stack: error.stack
        });
    }
}

const getPlace = async (req,res)=>{
    try {
        const placeId = req.params.placeId;
        const place = await PlaceModel.findById(placeId)
        res.status(200).json(place)
    } catch (error) {
        console.log("get place",error);
        res.status(error.status || 500).json({
            name: error.name || 'Internal Server Error',
            message: error.message || 'Something went wrong on the server.',
            stack: error.stack
        });
    }
}

const getAllPlaces = async (req,res)=>{
    try {
        const places = await PlaceModel.find({})
        res.status(200).json(places)
    } catch (error) {
        console.log("all places",error);
        res.status(error.status || 500).json({
            name: error.name || 'Internal Server Error',
            message: error.message || 'Something went wrong on the server.',
            stack: error.stack
        });
    }
}

module.exports = {
    uploadImages,
    deleteImage,
    addPlace,
    editPlace,
    getUserPlaces,
    getPlace,
    getAllPlaces
}