// for using dotenv files
require("dotenv").config();

const cors = require("cors"); // Import cors middleware
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware to enable CORS

// connection starts
const User = require("./models/User");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error(err));
// connection ends

// get all users
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
        const { fullName, email, password } = req.body;
        const newUser = new User({
            fullName,
            email,
            password
        });
        const response = newUser.save();
        res.send({ message: "User is registered successfully!" });
    }
    catch (err) {
        console.log(err);
    }
})


app.get('/', (req, res) => {
    res.send('expense tracker app backend');
});

app.listen(3002, () => {
    console.log('Server listening on port 3002');
});