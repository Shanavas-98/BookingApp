const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    place:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'place',
        required: true 
    },
    paymentId:{
        type:String
    },
    amount:{
        type:Number
    },
    checkIn: {
        type:Date,
        required: true
    },
    checkOut:{
        type:Date,
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

const BookingModel = mongoose.model('booking', bookingSchema);

module.exports = BookingModel;