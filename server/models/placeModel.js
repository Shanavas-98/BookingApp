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
    building:{
        type:String
    },
    locality:{
        type:String
    },
    street:{
        type:String
    },
    town:{
        type:String
    },
    district:{
        type:String
    },
    state:{
        type:String
    },
    pincode:{
        type:Number
    },
    rent:{
        type:Number,
        requied:true
    },
    cover:{
        type:String
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
},{
    timestamps:true
})

const PlaceModel = mongoose.model('place', placeSchema);

module.exports = PlaceModel;