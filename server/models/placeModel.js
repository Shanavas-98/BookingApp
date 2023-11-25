const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    title:{
        type:String,
        required: true
    },
    address:{
        type:String,
        requied: true
    },
    photos:[{
        type:String
    }],
    description:{
        type:String
    },
    amenities:[{
        type:String
    }],
    checkIn: {
        type:Date
    },
    checkOut:{
        type:Date
    },
    maxGuest:{
        type:Number
    }
})

const PlaceModel = mongoose.model('place', placeSchema);

module.exports = PlaceModel;