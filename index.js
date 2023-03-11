// for using dotenv files
require("dotenv").config();

const express = require('express');
const app = express();

// connection starts
const User = require("./models/User");
const Post = require('./models/Post');
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
app.get('/post', async (req, res) => {
    try {
        const data = await Post.find({});
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
app.post('/post', async (req, res)=>{
    try{
        const {title, body }= req.body;
        
    }
    catch(err){
        console.log(err);
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// function starts the server (necessary)
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});