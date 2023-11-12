const mongoose = require('mongoose');

const AccomodationSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String, 
    address: String, 
    addedPhotos: [String],
    description: String, 
    perks: [String], 
    extraInfo: String,
    checkInTime: String, 
    checkOutTime: String,
    maxGuests: Number,
    price: Number,
});

const AccomodationModel = mongoose.model('Accommodation', AccomodationSchema);

module.exports = AccomodationModel; 