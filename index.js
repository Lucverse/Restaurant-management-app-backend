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
      const { fullName, email, password, username, userType } = req.body;
      const existingUserEmail = await User.findOne({ email });
      const existingUsername = await User.findOne({ username });
  
      if (existingUserEmail) {
        return res.status(400).send({ error: 'Email already in use' });
      }
  
      if (existingUsername) {
        return res.status(400).send({ error: 'Username already in use' });
      }
  
      const newUser = new User({
        fullName,
        email,
        password,
        username,
        userType
      });
  
      const response = await newUser.save();
      res.send({ message: 'User is registered successfully!', username: newUser.username }); // Include username in the response
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