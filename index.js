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
app.get('/users', async (req, res) => {
    try {
        const data = await User.find({});
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
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
app.post('/users', async (req, res) => {
    try {
        const { fullName, email, password, username, userType, restaurantName } = req.body;
        const existingUserEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });
        const existingRestaurant = restaurantName ? await Restaurant.findOne({ name: restaurantName }) : null;

        if (existingUserEmail) {
            return res.status(400).send({ error: 'Email already in use' });
        }

        if (existingRestaurant) {
            return res.status(400).send({ error: 'A restaurant is already registered with that name' });
        }

        if (existingUsername) {
            return res.status(400).send({ error: 'Username already in use' });
        }

        let newUser;
        let newRestaurant;
        if (userType === 'staff') {
            if (!restaurantName) {
                return res.status(400).send({ error: 'Restaurant name is required for staff users' });
            }

            newRestaurant = new Restaurant({
                restaurantName,
                staff: username
            });
            newUser = new User({
                fullName,
                email,
                password,
                username,
                userType,
                restaurantName
            });
        }
        else {
            newUser = new User({
                fullName,
                email,
                password,
                username,
                userType
            });
        }

        const responseUser = await newUser.save();
        if (newRestaurant) {
            const responseRestaurant = await newRestaurant.save();
        }

        res.send({ message: 'User is registered successfully!', username: newUser.username });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

app.listen(3002, () => {
    console.log('Server listening on port http://localhost:3002/');
});
