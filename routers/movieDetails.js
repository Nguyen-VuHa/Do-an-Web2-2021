const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

router.use(function(req, res, next){
    res.locals.title = 'Movies Details';
    next();
});

router.get('/', function(req, res) {
    res.render('movieDetails');
})

module.exports = router;