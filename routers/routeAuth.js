const express = require('express');
const router  = express.Router();

const authController = require('../controllers/authController');

router.get('/register', authController.getAccount);
router.post('/new-account', authController.newAccount);


module.exports = router;