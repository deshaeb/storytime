const express = require('express');
const router = express.Router();
const hootsCtrl = require('../controllers/hoots');
const commentsCtrl = require('../controllers/comments');

//all paths start w/'api/hoots'

// GET /api/hoots --> INDEX functionality 
router.get('/', hootsCtrl.index);

// GET /hoots/:hootId --> SHOW FUNCTIONALITY 
router.get('/:hootId', hootsCtrl.show);

// POST /hoots --> CREATE FUNCTIONALITY 
router.post('/', hootsCtrl.create); 

// POST /hoots/:hootId/comments --> COMMENT --- CREATE FUNCTIONALITY
router.post('/:hootId/comments', commentsCtrl.create); 

// PUT /hoots/:hootId --> UPDATE FUNCTIONALITY
router.put('/:hootId', hootsCtrl.update); 

// PUT /hoots/:hootId/comments/:comment Id --> COMMENT - UPDATE FUNCTIONALITY 
router.put('/:hootId/comments/:commentId', commentsCtrl.update);

// DELETE /hoots/:hootId --> DELETE FUNCTIONALITY
router.delete('/:hootId',hootsCtrl.hootsDelete); 

// DELETE 
router.delete('/:hootId/comments/:commentId', commentsCtrl.deleteComment); 

module.exports = router;