const Hoot = require('../models/book.js');
const checkToken = require('../middleware/checkToken.js');

module.exports = {
    index,
    show, 
    create,
    update,
    hootsDelete,
}

// INDEX FUNCTIONALITY 
 async function index(req, res) {
    try {
      const hoots = await Hoot.find({})
        .populate('author')
        .sort({ createdAt: 'desc' });
      res.status(200).json(hoots);
    } catch (error) {
      res.status(500).json(error);
    }
  };

// SHOW FUNCTIONALITY 
async function show(req, res) {
    try {
      const hoot = await Hoot.findById(req.params.hootId).populate('author');
      res.status(200).json(hoot);
    } catch (error) {
      res.status(500).json(error);
    }
  };

// CREATE FUNCTIONALITY 
 async function create(req, res) {
    console.log(req.user);
    try {
      req.body.author = req.user._id;
      const hoot = await Hoot.create(req.body);
      hoot._doc.author = req.user;
      res.status(201).json(hoot);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

// UPDATE FUNCTIONALITY
async function update(req, res) {
    try {
      // Find the hoot:
      const hoot = await Hoot.findById(req.params.hootId);
  
      // Check permissions:
      if (!hoot.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      // Update hoot:
      const updatedHoot = await Hoot.findByIdAndUpdate(
        req.params.hootId,
        req.body,
        { new: true }
      );
  
      // Append req.user to the author property:
      updatedHoot._doc.author = req.user;
  
      // Issue JSON response:
      res.status(200).json(updatedHoot);
    } catch (error) {
      res.status(500).json(error);
    }
  };

// DELETE FUNCTIONALITY
 async function hootsDelete(req, res) {
    try {
      const hoot = await Hoot.findById(req.params.hootId);
  
      if (!hoot.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      const deletedHoot = await Hoot.findByIdAndDelete(req.params.hootId);
      res.status(200).json(deletedHoot);
    } catch (error) {
      res.status(500).json(error);
    }
  };