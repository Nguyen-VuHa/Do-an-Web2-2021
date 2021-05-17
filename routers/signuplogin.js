
const express = require('express');
const router = express.Router();

router.use(function(req, res, next){
    res.locals.title = 'Đăng Ký Thành Viên';
    next();
});

router.get('/', function(req, res) {
    res.render('signup-login');
});

module.exports = router;