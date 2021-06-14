const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

router.use(function(req, res, next){
    res.locals.title = `CGV KHTN CS 2`;
    next();
});

router.get('/',asyncHandler(async function(req, res) {
    res.render('cinemaView');
}));

module.exports = router;