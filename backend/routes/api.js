const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require("../models/user");

const db = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@atlascluster.h5xpu.mongodb.net/eventsdb?retryWrites=true&w=majority`; //connection string to Mongo Atlas

mongoose.connect(db, (err) => {
    if(err) {
        console.warn('Connection Error');
        return;
    }
    console.log('Connected to mongoDB');
});

router.get('/', (req, res) => {
    res.send('From API route');
})

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200).send(registeredUser)
        }
    });
})

module.exports = router;