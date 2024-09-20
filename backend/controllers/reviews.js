const Book = require("../models/book.js");
const checkToken = require("../middleware/checkToken.js");

module.exports = {
  create,
  deleteReview,
  update,
};

// CREATE FUNCTIONALITY
async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const book = await Book.findById(req.params.bookId);
    book.reviews.push(req.body);
    await book.save();

    // Find the newly created review:
    const newReview = book.reviews[book.reviews.length - 1];

    newReview._doc.author = req.user;

    // Respond with the newReview:
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json(error);
  }
}

// UPDATE FUNCTIONALITY
async function update(req, res) {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const review = book.reviews.id(req.params.reviewId);
    review.text = req.body.text;
    await book.save();
    res.status(200).json({ message: "Ok" });
  } catch (err) {
    res.status(500).json(err);
  }
}

// DELETE FUNCTIONALITY
async function deleteReview(req, res) {
  try {
    const book = await Book.findById(req.params.bookId);
    book.reviews.remove({ _id: req.params.reviewId });
    await book.save();
    res.status(200).json({ message: "Ok" });
  } catch (err) {
    res.status(500).json(err);
  }
}
