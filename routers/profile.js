
const express = require('express');

const router = express.Router();

router.use(function(req, res, next){
    res.locals.title = 'Thông Tin Cá Nhân';
    next();
});

router.get('/', function(req, res) {
    res.render('profile');
});

router.post('/', function(req, res) {
    res.redirect('/');
});

module.exports = router;
