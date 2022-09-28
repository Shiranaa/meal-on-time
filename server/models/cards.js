// const { string } = require('joi');
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    rating: {
        type: Number,
        require: true,
    },
    imageUrl: {
        type: String,
        require: true,
    },
});

const Card = mongoose.model('Card', cardSchema);

exports.Card = Card;