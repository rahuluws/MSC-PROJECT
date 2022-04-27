const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: String,
    author: String,
    price:Number,
    publisher:String,
    category: String,
    publishedDate:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);