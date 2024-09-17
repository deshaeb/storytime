const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../middleware/ensureLoggedIn')

//all paths start w/'api/books'

// GET /api/books --> INDEX functionality 
router.get('/', booksCtrl.index);

// GET /books/:bookId --> SHOW FUNCTIONALITY 
router.get('/:bookId', ensureLoggedIn, booksCtrl.show);

// POST /books --> CREATE FUNCTIONALITY 
router.post('/', ensureLoggedIn, booksCtrl.create); 

// POST /books/:bookId/reviews --> review --- CREATE FUNCTIONALITY
router.post('/:bookId/reviews', ensureLoggedIn, reviewsCtrl.create); 

// PUT /books/:bookId --> UPDATE FUNCTIONALITY
router.put('/:bookId', ensureLoggedIn, booksCtrl.update); 

// PUT /books/:bookId/reviews/:review Id --> review - UPDATE FUNCTIONALITY 
router.put('/:bookId/reviews/:reviewId', ensureLoggedIn, reviewsCtrl.update);

// DELETE /books/:bookId --> DELETE FUNCTIONALITY
router.delete('/:bookId', ensureLoggedIn,booksCtrl.booksDelete); 

// DELETE 
router.delete('/:bookId/reviews/:reviewId', ensureLoggedIn, reviewsCtrl.deleteReview); 

module.exports = router;