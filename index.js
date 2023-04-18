require("dotenv").config();

const cors = require("cors");
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const User = require("./models/User");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error(err));

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
        const { fullName, email, password, username, userType, restaurantName } = req.body;
        const existingUserEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });
        const existingRestaurant = restaurantName ? await User.findOne({ restaurantName }) : null;

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
        if (userType === 'staff') {
            if (!restaurantName) {
                return res.status(400).send({ error: 'Restaurant name is required for staff users' });
            }
            newUser = new User({
                fullName,
                email,
                password,
                username,
                userType,
                restaurantName
            });
        } else {
            newUser = new User({
                fullName,
                email,
                password,
                username,
                userType
            });
        }

        const response = await newUser.save();
        res.send({ message: 'User is registered successfully!', username: newUser.username });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});


app.get('/', (req, res) => {
    res.send('expense tracker app backend');
});

app.listen(3002, () => {
    console.log('Server listening on port 3002');
});
app.get('/update', (req, res) => {
    res.send('update');
})
app.put('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        res.send({ message: `'User information updated successfully! ${req.params, res}'` });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});
