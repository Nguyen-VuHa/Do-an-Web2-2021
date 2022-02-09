const express = require('express');
const router  = express.Router();

const authController = require('../controllers/authController');

router.get('/user-infomation', authController.getInfoUser);

router.post('/new-account', authController.newAccount);
router.post('/refresh-token', authController.refreshToken);
router.post('/login-account', authController.loginAccount);

module.exports = router;