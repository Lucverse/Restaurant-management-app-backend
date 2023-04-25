const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    staff: {
        type: [String],
        required: true,
    },
    openhours: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    type: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
