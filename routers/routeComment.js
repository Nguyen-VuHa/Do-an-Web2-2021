const express = require('express');
const router  = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const CommentController = require('../controllers/commentController');

router.get('/comments/:movieId', CommentController.getComments);
router.post('/add-comments', CommentController.addComments);


module.exports = router;