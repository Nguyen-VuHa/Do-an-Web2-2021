const express = require('express');
const router  = express.Router();

const authController = require('../controllers/authController');

router.get('/get-info-user', authController.getInfoUser);

router.post('/new-account', authController.newAccount);
router.post('/refresh-token', authController.refreshToken);
router.post('/login-account', authController.loginAccount);

module.exports = router;