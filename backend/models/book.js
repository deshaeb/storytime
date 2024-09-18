// models/book.js
const mongoose = require('mongoose');

// embedded comment schema:
const reviewSchema = new mongoose.Schema(
    {
      text: {
        type: String,
        required: true
      },
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
  );

//BOOK MODULE: 
const bookSchema = new mongoose.Schema(
    {
      imageUrl: { 
        type: String,
        required: false,

      },
      category: {
        type: String,
        required: true,
        enum: ['Mystery', 'Fiction', 'Non-Fiction', 'Adventure', 'Thriller', 'Drama', 'Romance', 'Memoir', 'Other'],
      },
      title: {
        type: String,
        required: true,
      },
      bookAuthor: {
        type: String,
        required: true,
      },
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      reviews: [reviewSchema],
    },
    { timestamps: true }
  );
  
  const Book = mongoose.model('Book', bookSchema);


  module.exports = Book;