const express = require('express');
const router  = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const CommentController = require('../controllers/commentController');

router.get('/comments/:movieId', CommentController.getComments);
router.post('/comments/create', verifyToken,  CommentController.addComments);
router.post('/comments/create-feedback-comments', verifyToken , CommentController.addFeedbackComments);



module.exports = router;