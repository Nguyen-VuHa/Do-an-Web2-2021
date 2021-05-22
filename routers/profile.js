
const express = require('express');
const ensureLoggedIn = require('../middlewares/ensure_logged_in');
const router = express.Router();

router.use(ensureLoggedIn);

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
