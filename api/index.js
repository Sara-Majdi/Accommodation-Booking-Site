//mongo atlas password = ZsTUIpsJArf9lZl4

const express = require('express'); 
const cors = require('cors');  // Allow Frontend Server communicate with Backend Server while ensuring security
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // This package is used to encrypt user's login password 
const jwt = require('jsonwebtoken');
const User = require('./models/User'); //Importing UserModels from "User.js"
const cookieParser = require('cookie-parser'); 
require('dotenv').config(); //Require this package to read 'enc' files succesfully 
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10); 
const jwtSecret = 'jtghwhjwjlerkfnhqerfbhwt'

app.use(express.json()); //Using JSON Parser
app.use(cookieParser()); //Using Cookie Parser
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

//  Connecting to Mongo Atlas 
mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
    res.json('test ok')
})

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


app.post('/login', async(req, res) => {
    const {email, password} = req.body; 

    const userDoc = await User.findOne({email});
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

app.listen(4000)