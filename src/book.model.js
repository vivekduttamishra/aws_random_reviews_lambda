const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    details: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now }
});

const authorSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    bio: { type: String },
    books: [{ type: String, ref: 'Book' }]
});
const bookSchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, ref: 'Author', required: true },
    //publishedDate: { type: Date, required: true },
    //genre: { type: String, required: true },
    reviews: [reviewSchema]
});

const Book = mongoose.model('Book', bookSchema, 'books');
const Author = mongoose.model('Author', authorSchema, 'authors');

module.exports = { Book, Author };