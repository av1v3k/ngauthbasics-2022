const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const allEvents = require('../events');

dotenv.config();

const User = require("../models/user");

const db = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@atlascluster.h5xpu.mongodb.net/eventsdb?retryWrites=true&w=majority`; //connection string to Mongo Atlas

mongoose.connect(db, (err) => {
    if (err) {
        console.warn('Connection Error');
        return;
    }
    console.log('Connected to mongoDB');
});

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        } else {
            const payload = { subject: registeredUser._id };
            const token = jwt.sign(payload, "secretkey");
            res.status(200).send({ token });
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                res.status(401).send('Invalid Email');
            } else if (userData.password !== user.password) {
                res.status(401).send('Invalid Password');
            } else {
                const payload = { subject: user._id };
                const token = jwt.sign(payload, "secretkey");
                res.status(200).send({ token });
            }
        }
    });
});

router.get('/events', (req, res) => {
    const events = allEvents.events;

    res.json(events);

});

router.get('/specialevents', (req, res) => {
    const events = allEvents.specialEvents;

    res.json(events);

});

module.exports = router;