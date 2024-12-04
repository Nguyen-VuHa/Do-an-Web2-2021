const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/user/wallet-personal', verifyToken, userController.getWalletPersonal);  
router.get('/user/infomation', verifyToken, userController.getInfoUser);  
router.get('/notification/count-notify', verifyToken, userController.getCountNotification);
router.get('/avartar/efcdbd4f-50f9-4517-abd3-c136c6cf123c', verifyToken, userController.getAvartarUser);
router.get('/user/all-image-user', verifyToken, userController.getAllImageUser);
router.post('/notification/list', verifyToken, userController.listNotification);
router.post('/recharge-money/create', verifyToken, userController.createRechargeMoney);
router.post('/user/change-avartar', verifyToken, userController.saveAvartarUser);
router.post('/user/update-info', verifyToken, userController.updateProfile);
router.post('/user/update-avartar', verifyToken, userController.updateImageUser);



module.exports = router;