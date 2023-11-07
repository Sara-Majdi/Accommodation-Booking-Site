const mongoose = require('mongoose')

const AccomodationSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, red:'User'},
    title: String, 
    address: String, 
    photo: [String],
    description: String, 
    perks: [String], 
    extraInfo: String,
    checkIn: Number, 
    checkOut: Number,
    maxGuests: Number,

})

const AccomodationModel = mongoose.model('Accommodation', AccomodationSchema);

module.exports = AccomodationModel; 