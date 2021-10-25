const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/922a85e5-0aa1-4977-bc26-0af50fe8e50e', verifyToken, userController.getInfoUser); // get Info
router.get('/6698afba-1c21-478d-a519-4b09200586e5', verifyToken, userController.getCountNotification); // Count Notify
router.post('/109db409-56dd-4829-af16-414df236bd9c', verifyToken, userController.listNotification); // Count Notify
router.post('/user/2d01c471-7573-4bbb-8929-b6be0c346f4f', verifyToken, userController.updateProfile); // update Profile


module.exports = router;