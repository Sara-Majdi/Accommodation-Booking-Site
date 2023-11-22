const mongoose = require('mongoose');

// Define Schema for the Models 
const BookingSchema = new mongoose.Schema({
    accommodation : {type: mongoose.Schema.Types.ObjectId, required: true, ref:'Accommodation'},
    user : {type: mongoose.Schema.Types.ObjectId, required: true},
    checkInTime: {type: Date, required:true},
    checkOutTime: {type: Date, required:true},
    guestsNum: {type: Number, required:true},
    guestsName: {type: String, required:true},
    guestsPhoneNum: {type: String, required:true},
    totalPrice: Number,
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;