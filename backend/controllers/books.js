const Book = require('../models/book.js');
const checkToken = require('../middleware/checkToken.js');

module.exports = {
    index,
    show, 
    create,
    update,
    booksDelete,
}

// INDEX FUNCTIONALITY 
 async function index(req, res) {
    try {
      const books = await Book.find({})
        .populate('author')
        .sort({ createdAt: 'desc' });
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json(error);
    }
  };

// SHOW FUNCTIONALITY 
async function show(req, res) {
    try {
      const book = await Book.findById(req.params.bookId).populate('author');
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json(error);
    }
  };

// CREATE FUNCTIONALITY 
 async function create(req, res) {
    console.log(req.user);
    try {
      req.body.author = req.user._id;
      const book = await Book.create(req.body);
      book._doc.author = req.user;
      res.status(201).json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

// UPDATE FUNCTIONALITY
async function update(req, res) {
    try {
      // Find the book:
      const book = await Book.findById(req.params.bookId);
  
      // Check permissions:
      if (!book.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      // Update book:
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.bookId,
        req.body,
        { new: true }
      );
  
      // Append req.user to the author property:
      updatedBook._doc.author = req.user;
  
      // Issue JSON response:
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).json(error);
    }
  };

// DELETE FUNCTIONALITY
 async function booksDelete(req, res) {
    try {
      const book = await Book.findById(req.params.bookId);
  
      if (!book.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      const deletedBook = await Book.findByIdAndDelete(req.params.bookId);
      res.status(200).json(deletedBook);
    } catch (error) {
      res.status(500).json(error);
    }
  };