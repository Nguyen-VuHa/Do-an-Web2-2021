const express = require('express');
const Theaters = require('../models/theater');
const asyncHandler = require('express-async-handler');
const router = express.Router();

router.use(function(req, res, next){
    res.locals.title = 'Hệ Thống Rạp';
    next();
});


router.get('/',asyncHandler(async function(req, res) {
    res.render('cinemaSystem');
}));


// API Data
router.get('/api/data', asyncHandler(async function(req, res) {
    const data = await Theaters.findAll();
    res.json(data);
}));

module.exports = router;