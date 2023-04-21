const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
    },
    restaurantName: {
        type: String,
    },
    itemDescription: {
        type: String,
    },
    itemImage: {
        type: String,

    },
    itemPrice: {
        type: String,
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


const Items = mongoose.model('Items', itemSchema);

module.exports = Items;
