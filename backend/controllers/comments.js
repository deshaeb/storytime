const Hoot = require('../models/book.js');
const checkToken = require('../middleware/checkToken.js');

module.exports = {
    create,
    deleteComment,
    update,
}

// CREATE FUNCTIONALITY 
async function create(req, res) {
    try {
      req.body.author = req.user._id;
      const hoot = await Hoot.findById(req.params.hootId);
      hoot.comments.push(req.body);
      await hoot.save();
  
      // Find the newly created comment:
      const newComment = hoot.comments[hoot.comments.length - 1];
  
      newComment._doc.author = req.user;
  
      // Respond with the newComment:
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json(error);
    }
  };

// DELETE FUNCTIONALITY 
async function deleteComment(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    hoot.comments.remove({ _id: req.params.commentId });
    await hoot.save();
    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE FUNCTIONALITY 
 async function update(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    const comment = hoot.comments.id(req.params.commentId);
    comment.text = req.body.text;
    await hoot.save();
    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    res.status(500).json(err);
  }
};