const mongoose = require('mongoose');


// Define Schema for the Models 
const UserSchema = new mongoose.Schema({
    name: String, 
    email: {type:String, unique: true},
    password: String,
}); 

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;