const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

router.use(function(req, res, next){
    res.locals.title = 'Hệ Thống Rạp';
    next();
});


router.get('/',asyncHandler(async function(req, res) {
    res.render('cinemaSystem');
}));

module.exports = router;