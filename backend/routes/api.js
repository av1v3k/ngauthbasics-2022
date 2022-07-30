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

function verifyToken(req, res, next) {
    console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if(err && err.message === "jwt malformed") {
            res.status(500).send('TOKEN_INVALID');
        }
        let payload = decoded;
        if (!payload) {
            return res.status(401).send('Unauthorized request and payload is empty');
        }
        req.userId = payload.subject;
    });
    next();
}

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

router.get('/specialevents', verifyToken, (req, res) => {
    const events = allEvents.specialEvents;

    res.json(events);

});

module.exports = router;