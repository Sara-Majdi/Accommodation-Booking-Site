
const express = require('express'); 
const cors = require('cors');  // Allow Frontend Server communicate with Backend Server while ensuring security
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // This package is used to encrypt user's login password 
const jwt = require('jsonwebtoken');
const User = require('./models/User.js'); //Importing UserModel from "User.js"
const Accommodation = require('./models/Accommodation.js'); //Importing AccomodationModel from "Accomodation.js"
const Booking = require('./models/Booking.js') //Importing BookingModel from "Booking.js"
const cookieParser = require('cookie-parser'); 
const multer = require('multer'); //Middleware for handling multipart/form-data, which is primarily used for uploading files
const imageDownloader = require('image-downloader'); // For downloading image to disk from a given URL
const fs = require('fs')

require('dotenv').config(); //Require this package to import enviromental variables from 'env' files succesfully 
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10); 
const jwtSecret = 'jtghwhjwjlerkfnhqerfbhwt'

app.use(express.json()); //Using JSON Parser
app.use(cookieParser()); //Using Cookie Parser
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

//  Connecting to Mongo Atlas 
mongoose.connect(process.env.MONGO_URL)


// Test page (Used for testing)
app.get('/test', (req, res) => {
    res.json('test ok')
})

// Register Page 
app.post('/register', async (req, res) => {
    const {name, email, password} = req.body; //Destructuring
    
    try{
        const userDoc = await User.create({
            name, 
            email, 
            password:bcrypt.hashSync(password, bcryptSalt), //Encrypting the password so the real password cant be seen in the database
        });

        res.json(['Successfully Registered New User',userDoc]);
        

    } catch (e) {
        res.status(422).json('Registration Failed. There Is Already A User With The Same Email. Please Log In With Your Previously Registered Account.');
    }

});

// Login Page 
app.post('/login', async(req, res) => {
    const {email, password} = req.body; //Destructuring 

    const userDoc = await User.findOne({email:email});
    if (userDoc) {
        const passwordMatches = bcrypt.compareSync(password, userDoc.password);
        if (passwordMatches) {
            jwt.sign({
                email: userDoc.email, 
                id: userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(['Successfully Logged In', userDoc]);
            })
            
        } else {
            res.json('Incorrect Password');
        }
    } else {
        res.json('Email Not Found');
    }

});

// Profile Page 
app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData)=> {
            if (err) throw err; 
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name, email, _id});
        });

    } else {
        res.json(null);
    }

})

// Logout Page 
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('Succesfully Logged Out');
});


// Upload Room Pictures by Link feature  
app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body; //Destructuring
    const newName = 'photo' + Date.now() + '.jpg';

    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });

    res.json(newName)
})


// Upload Room Pictures from Device feature 
const photosMiddleware = multer({ dest: 'uploads/' }); 
app.post('/upload-from-device', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {  //Looping thru every photo file that is added from device
        const {path, originalname} = req.files[i]; //Setting the photo's info to variables
        const parts = originalname.split('.'); //Splitting the photo name into 2 parts 
        const extension = parts[parts.length - 1]; //Just need the behind extension, eg: '.webp' or '.jpg'
        const newPath = path + '.' + extension; //Creatinng a new name for the photo
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', '')); //Adding it into the empty array 
    }

    res.json(uploadedFiles);
})

// Registering and Adding 'accommodations' that user have added in the database
app.post('/accommodations', (req, res) => {
    const {token} = req.cookies;
    const {
        title, address, addedPhotos, 
        description, perks, extraInfo,
        checkInTime, checkOutTime, maxGuests, price,
    } = req.body; //Destructuring 

    jwt.verify(token, jwtSecret, {}, async (err, userData)=> {
        if (err) throw err; 
        const placeDoc = await Accommodation.create({
            owner:userData.id,
            title, address, addedPhotos, 
            description, perks, extraInfo,
            checkInTime, checkOutTime, maxGuests, price,
        });

        res.json(['Successfully Added New Accommodation', placeDoc]);
    });
})

// Sending Accommodations details that A CERTAIN USER added, from the database, to be displayed at '/account/accommodations'
app.get('/user-accommodations', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=> {
        if (err) throw err;
        const {id} = userData;
        //Places registered under the same 'owner' id will all be sent and displayed at '/account/accommodations'
        const userAccommodations = await Accommodation.find({owner: id});
        res.json([userAccommodations.length, userAccommodations]);
    });

});

// Sending Accommodations details that users added, from the database, to be displayed at '/account/accommodations/:id'
app.get('/accommodations/:id', async (req, res) => {
    const {id} = req.params; //Getting the id from params
    res.json(await Accommodation.findById(id)); // Finding the id in the database 
}); 

// Updating Accommodations data that user added in the database
app.put('/accommodations', async (req, res) => {
    const {token} = req.cookies;
    const {
        placeID, title, address, addedPhotos, 
        description, perks, extraInfo,
        checkInTime, checkOutTime, maxGuests, price,
    } = req.body; //Destructuring 
    jwt.verify(token, jwtSecret, {}, async (err, userData)=> {
        if (err) throw err;
        const placeDoc = await Accommodation.findById(placeID);
        // console.log(userData.id);
        // console.log(placeDoc.owner.toString());
        if (userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title, address, addedPhotos, 
                description, perks, extraInfo,
                checkInTime, checkOutTime, maxGuests, price
            });
            await placeDoc.save();
            res.json(placeDoc);
        };
    });
});

// Deleting Accommodation that users added from the database
app.delete('/accommodations/:id', async (req, res) => {
    const {id} = req.params; //Getting the id from params

    // Use $lookup to find the Booking document based on the Accommodation id
    const bookingDetails = await Booking.findOne({ accommodation:id }).populate('accommodation');
    if (bookingDetails) {
        const deleteBooking = await Booking.deleteOne(bookingDetails._id);
        const deleteAccommodation = await Accommodation.findByIdAndDelete(id);
        res.json([deleteBooking, deleteAccommodation]); 
    } else {
        const deleteAccommodation = await Accommodation.findByIdAndDelete(id);
        res.json(["Succesfully Deleted Accommodation", deleteAccommodation]);
    }
    
}); 

// Sending Accommodations details that ALL USERS added, from the database, to be displayed at Home Page
app.get('/all-accommodations', async (req, res) => {
    const allAccommodations = await Accommodation.find().maxTimeMS(30000); // Set timeout to 30 seconds
    res.json([allAccommodations.length, allAccommodations]); 

});

// Registering 'bookings' that user have added in the database
app.post('/bookings', (req, res) => {
    const {token} = req.cookies; //Destructuring 
    const {
        accommodation, checkInDate, 
        checkOutDate, guestsNum, 
        guestsName, guestsPhoneNum, numOfNights,
        accommodationPriceForNumOfNights, serviceFee, totalPrice, 
    } = req.body; //Destructuring 

    jwt.verify(token, jwtSecret, {}, async (err, userData)=> {
        if (err) throw err;
        const bookingDoc = await Booking.create({
            accommodation, checkInDate, 
            checkOutDate, guestsNum, 
            guestsName, guestsPhoneNum, numOfNights,
            accommodationPriceForNumOfNights, serviceFee, 
            totalPrice, user:userData.id,
        }); 
    
        res.json(['Successfully Added New Booking',bookingDoc]); 
    });
});

// Sending Bookings details that A CERTAIN USER added, from the database, to be displayed at '/account/bookings'
app.get('/bookings', (req, res) => {

    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=> {
        if (err) throw err;
        //Bookings registered under the same user "id" will all be sent and displayed at '/account/bookings'
        const allBookings = await Booking.find({user:userData.id}).populate('accommodation');
        res.json( [allBookings.length, allBookings]) ;
    });
})

// Deleting Booking that users added from the database
app.delete('/bookings/:id', async (req, res) => {
    const {id} = req.params; //Getting the id from params
    const deleteBooking = await Booking.findByIdAndDelete(id) ;
    res.json(["Succesfully Deleted Booking", deleteBooking])
})


// Server listening to port 4000
app.listen(4000)
