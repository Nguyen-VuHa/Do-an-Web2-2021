const express = require('express');
const router = express.Router();
const UserAccount = require('../models/useraccount');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

router.use(function(req, res, next){
    res.locals.title = 'Đăng Ký Thành Viên';
    next();
});

router.get('/', function(req, res) {
    res.render('signuplogin', { error: 1, message: 'Đăng Ký Thành Công!' });
});

router.post('/dang-ky', function(req, res) {
   res.redirect('/reg');
})

module.exports = router;