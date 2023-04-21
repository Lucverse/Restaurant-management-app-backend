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
