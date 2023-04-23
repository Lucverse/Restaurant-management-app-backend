require("dotenv").config();

const cors = require("cors");
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const User = require("./models/User");
const Items = require("./models/Item");
const Restaurant = require("./models/Restaurant.js");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Restaurant Management App');
});

app.get('/items', async (req, res) => {
    try {
        const data = await Items.find({});
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
app.post('/items', async (req, res) => {
    try {
        const newItem = new Items(req.body);
        const savedItem = await newItem.save();
        res.status(200).json(savedItem);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/restaurants', async (req, res) => {
    try {
        const data = await Restaurant.find({});
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
app.post('/restaurants', async (req, res) => {
    try {
        const newItem = new Restaurant(req.body);
        const savedItem = await newItem.save();
        res.status(200).json(savedItem);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
app.get('/users', async (req, res) => {
    try {
        const data = await User.find({});
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
app.post('/users', async (req, res) => {
    try {
        const { fullName, email, password, username, userType } = req.body;
        const existingUserEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingUserEmail) {
            return res.status(400).send({ error: 'Email already in use' });
        }
        if (existingUsername) {
            return res.status(400).send({ error: 'Username already in use' });
        }
        let newUser = new User({
            fullName,
            email,
            password,
            username,
            userType
        });
        const responseUser = await newUser.save();
        console.log(newUser);
        res.send({ message: 'User is registered successfully!', username: newUser.username });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

app.listen(3002, () => {
    console.log('Server listening on port http://localhost:3002/');
});
