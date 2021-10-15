const express = require('express');
const router  = express.Router();

const authController = require('../controllers/authController');


router.post('/new-account', authController.newAccount);
router.post('/login-account', authController.loginAccount);

module.exports = router;