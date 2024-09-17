const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');
const reviewsCtrl = require('../controllers/reviews');

//all paths start w/'api/books'

// GET /api/books --> INDEX functionality 
router.get('/', booksCtrl.index);

// GET /books/:bookId --> SHOW FUNCTIONALITY 
router.get('/:bookId', booksCtrl.show);

// POST /books --> CREATE FUNCTIONALITY 
router.post('/', booksCtrl.create); 

// POST /books/:bookId/reviews --> review --- CREATE FUNCTIONALITY
router.post('/:bookId/reviews', reviewsCtrl.create); 

// PUT /books/:bookId --> UPDATE FUNCTIONALITY
router.put('/:bookId', booksCtrl.update); 

// PUT /books/:bookId/reviews/:review Id --> review - UPDATE FUNCTIONALITY 
router.put('/:bookId/reviews/:reviewId', reviewsCtrl.update);

// DELETE /books/:bookId --> DELETE FUNCTIONALITY
router.delete('/:bookId',booksCtrl.booksDelete); 

// DELETE 
router.delete('/:bookId/reviews/:reviewId', reviewsCtrl.deleteReview); 

module.exports = router;