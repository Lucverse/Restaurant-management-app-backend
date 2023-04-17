const mongoose = require('mongoose');
const User = mongoose.model("User",
    new mongoose.Schema({
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }, username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }, userType: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    })
);
module.exports = User;