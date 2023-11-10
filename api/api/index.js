//mongo atlas password = ZsTUIpsJArf9lZl4

const express = require('express'); 
const cors = require('cors');  // Allow Frontend Server communicate with Backend Server while ensuring security
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // This package is used to encrypt user's login password 
const jwt = require('jsonwebtoken');
const User = require('./models/User'); //Importing UserModel from "User.js"
const Place = require('./models/Accommodation'); //Importing AccomodationModel from "Accomodation.js"
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
    const {name, email, password} = req.body;
    
    try{
        const userDoc = await User.create({
            name, 
            email, 
            password:bcrypt.hashSync(password, bcryptSalt),
        });

        res.json(userDoc);

    } catch (e) {
        res.status(422).json(e);
    }

});

// Login Page 
app.post('/login', async(req, res) => {
    const {email, password} = req.body; 

    const userDoc = await User.findOne({email:email});
    if (userDoc) {
        const passwordMatches = bcrypt.compareSync(password, userDoc.password)
        if (passwordMatches) {
            jwt.sign({
                email: userDoc.email, 
                id: userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            })
            
        } else {
            res.status(422).json('pass not ok')
        }
    } else {
        res.json('Email not found')
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
    res.cookie('token', '').json(true);
});


// Upload Room Pictures by Link feature  
app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
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

// Registering accommodations user added in the database
app.post('/accommodations', (req, res) => {
    const {token} = req.cookies;
    const {
        title, address, addedPhotos, 
        description, perks, extraInfo,
        checkInTime, checkOutTime, maxGuests, price,
    } = req.body; 

    jwt.verify(token, jwtSecret, {}, async (err, userData)=> {
        if (err) throw err; 
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, addedPhotos, 
            description, perks, extraInfo,
            checkInTime, checkOutTime, maxGuests, price,
        })

        res.json(placeDoc);
    });
})


// Server listening to port 4000
app.listen(4000);
