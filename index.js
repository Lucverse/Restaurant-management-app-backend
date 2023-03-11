// for using dotenv files
require("dotenv").config();

const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

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
app.post('/post', async (req, res) => {
    try {
        const { title, body } = req.body;
        const newPost = new Post({
            title, // means title : title
            body    // means body : body
        });
        const response = newPost.save();
        res.send({ message: "Post is created successfully!" });
    }
    catch (err) {
        console.log(err);
    }
})
// Update a post
app.put('/post/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ message: "Post updated successfully!", post: updatedPost });
    } catch (err) {
        console.log(err);
    }
});

// Delete a post
app.delete('/post/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        res.send({ message: "Post deleted successfully!", post: deletedPost });
    } catch (err) {
        console.log(err);
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// function starts the server (necessary)
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});