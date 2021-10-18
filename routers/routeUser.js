const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

const userController = require('../controllers/userController');


router.get('/6698afba-1c21-478d-a519-4b09200586e5', verifyToken, userController.getCountNotification); // Count Notify
router.post('/109db409-56dd-4829-af16-414df236bd9c', verifyToken, userController.listNotification); // Count Notify

module.exports = router;