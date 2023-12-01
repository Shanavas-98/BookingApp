const fs = require('fs').promises;
const PlaceModel = require("../models/placeModel");



const uploadImages = async (req, res) => {
    try {
        console.log('upload body', req.body);
        console.log('upload files', req.files);
        const files = req.files?.map((item) => (
            {
                originalName: item.originalname,
                fileName: item.filename
            })
        )
        console.log('files', files);
        res.json(files)
    } catch (error) {
        console.log("upload image", error);
    }
}

const deleteImage = async (req, res) => {
    try {
        console.log('params', req.params);
        const { fileName } = req.params;
        // Specify the path where your images are stored
        const imagePath = `./public/uploads/${fileName}`;
        // Check if the file exists
        await fs.access(imagePath);
        // Delete the file
        await fs.unlink(imagePath);

        res.status(200).json({ message: 'Image deleted successfully.' });
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('File not found:', filename);
        }
        console.error('Error deleting image', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addPlace = async (req, res) => {
    try {
        const userId = req.userId
        console.log('bodyAdd', req.body);
        const { title, address, uploaded,
            description, perks, checkin,
            checkout, maxGuest } = req.body;
        const photos = uploaded?.map((item)=>item.fileName)
        const newPlace = await PlaceModel.create({
            owner: userId,
            title: title,
            address: address,
            photos: photos,
            description: description,
            perks: perks,
            checkIn: checkin,
            checkOut: checkout,
            maxGuest: maxGuest
        })
        console.log(newPlace);
        res.json({ success: true, message: "place added successfully" })
    } catch (error) {
        console.log("add place", error);
    }
}

const getUserPlaces = async(req,res)=>{
    try {
        const userId = req.userId;
        const places = await PlaceModel.find({owner: userId});
        if(!places){
            throw Error("Places not added!")
        }
        res.json(places)
    } catch (error) {
        
    }
}

module.exports = {
    addPlace,
    uploadImages,
    deleteImage
}