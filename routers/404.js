
const express = require('express');

const router = express.Router();

router.use(function(req, res, next){
    res.locals.title = 'Page Not Found';
    next();
});

router.get('/', function(req, res) {
    res.render('page404');
});

module.exports = router;
