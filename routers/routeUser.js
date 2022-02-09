const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/922a85e5-0aa1-4977-bc26-0af50fe8e50e', verifyToken, userController.getInfoUser);  
router.get('/notification/count-notify', verifyToken, userController.getCountNotification);
router.get('/avartar/efcdbd4f-50f9-4517-abd3-c136c6cf123c', verifyToken, userController.getAvartarUser);
router.get('/get-image/f3cbabb5-c184-431e-b5b7-e48a4f17cb06', verifyToken, userController.getAllImageUser);
router.post('/notification/list', verifyToken, userController.listNotification);
router.post('/avartar/f0fa6ed4-3b4a-4e69-8a27-2063055e27a6', verifyToken, userController.saveAvartarUser);
router.post('/user/2d01c471-7573-4bbb-8929-b6be0c346f4f', verifyToken, userController.updateProfile);
router.post('/image/82fcfba6-1d63-443a-b7b9-d10b9941f3c6', verifyToken, userController.updateImageUser);



module.exports = router;