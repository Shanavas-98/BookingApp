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
    rent:{
        type:Number,
        requied:true
    },
    photos:[{
        type:String
    }],
    description:{
        type:String
    },
    beds:{
        type:Number,
        default:1,
        required:true
    },
    bedrooms:{
        type:Number,
        default:1,
        required: true
    },
    bathrooms:{
        type:Number,
        default:0,
        required: true
    },
    facilities:[{
        type:String
    }],
    perks:[{
        type:String
    }],
    checkIn: {
        type:String,
        required: true
    },
    checkOut:{
        type:String,
        required: true
    },
    guests:{
        type:Number,
        default:1,
        required: true
    }
})

const PlaceModel = mongoose.model('place', placeSchema);

module.exports = PlaceModel;