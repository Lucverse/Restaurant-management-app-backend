require("dotenv").config();

const cors = require("cors");
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoose = require("mongoose");

const User = require("./models/User.js");
const Items = require("./models/Item.js");
const Restaurant = require("./models/Restaurant.js");
const Orders = require("./models/Orders.js");
const Recipe = require("./models/Recipe");

mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Restaurant Management App');
});

// items 
app.get('/items', async (req, res) => {
    try {
        const data = await Items.find({});
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
app.get('/items/:id', async (req, res) => {
    try {
        const newItem = await Items.findById(req.params.id, req.body, { new: true });
        const savedItem = await newItem.save();
        res.status(200).json(savedItem);
    } catch (err) {
        console.log(err);
    }
});
app.post('/items', async (req, res) => {b
    try {
        const newItem = new Items(req.body);
        const savedItem = await newItem.save();
        res.status(200).json(savedItem);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// orders
app.get('/orders', async (req, res) => {
    try {
        const data = await Orders.find({});
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
app.get('/orders/:id', async (req, res) => {
    try {
        const newItem = await Orders.findById(req.params.id, req.body, { new: true });
        const savedItem = await newItem.save();
        res.status(200).json(savedItem);
    } catch (err) {
        console.log(err);
    }
});
app.get('/orders/user/:userId', async (req, res) => {
    try {
        const data = await Orders.find({ userId: req.params.userId });
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
app.post('/orders', async (req, res) => {
    try {
        const newOrder = new Orders({
            itemArray: req.body.itemArray,
            userId: req.body.userId,
        });
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// restaurants
app.get('/restaurants', async (req, res) => {
    try {
        const data = await Restaurant.find({});
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
app.get('/restaurants/:id', async (req, res) => {
    try {
        const newItem = await Restaurant.findById(req.params.id, req.body, { new: true });
        const savedItem = await newItem.save();
        res.status(200).json(savedItem);
    } catch (err) {
        console.log(err);
    }
});
app.post('/restaurants', async (req, res) => {
    try {
        const { restaurantName, userId, email, password, address, openhours, type } = req.body;
        const existingrestaurantName = await Restaurant.findOne({ restaurantName });
        if (existingrestaurantName) {
            return res.status(200).send({ error: 'Restaurant Name already in use' });
        }
        const newRestaurant = new Restaurant({
            restaurantName,
            staff: [userId],
            email,
            password,
            address,
            openhours,
            type
        });
        const restResponse = await newRestaurant.save();
        res.status(200).json({ message: "Restaurant Registration Successful", data: restResponse });
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

// users
app.get('/users', async (req, res) => {
    try {
        const data = await User.find({});
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
app.get('/users/:id', async (req, res) => {
    try {
        const newItem = await User.findById(req.params.id, req.body, { new: true });
        const savedItem = await newItem.save();
        res.status(200).json(savedItem);
    } catch (err) {
        console.log(err);
    }
});
app.put('/users/:id', async (req, res) => {
    try {
        const { fullName, email, password, username, userType } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            fullName,
            email,
            password,
            username,
            userType
        }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Internal server error' });
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
        res.send({ message: 'User is registered successfully!', responseUser });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// recipe
app.get('/recipe', async (req, res) => {
    try {
        const data = await Recipe.find({});
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


app.listen(3002, () => {
    console.log('Server listening on port http://localhost:3002/');
});
