const mongoose = require('mongoose');

// Define Schema for the Models 
const BookingSchema = new mongoose.Schema({
    accommodation : {type: mongoose.Schema.Types.ObjectId, required: true, ref:'Accommodation'},
    user : {type: mongoose.Schema.Types.ObjectId, required: true},
    checkInDate: {type: Date, required:true},
    checkOutDate: {type: Date, required:true},
    guestsNum: {type: Number, required:true},
    guestsName: {type: String, required:true},
    guestsPhoneNum: {type: String, required:true},
    numOfNights: Number,
    accommodationPriceForNumOfNights: Number,
    serviceFee: Number,
    totalPrice: Number,
    
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;