const express = require('express');
const asyncHandler = require('express-async-handler');
const Movies = require('../models/movies');
const router = express.Router();

router.use(function(req, res, next){
    res.locals.title = 'Lịch Chiếu';
    next();
});

router.get('/',asyncHandler(async function(req, res) {
   res.render('showtimes');
}));

router.get('/api/:id',asyncHandler(async function(req, res) {
    const data = await Movies.findAll();
    var objData = {};
    var arrData = [];
    if(!data)
    {
        objData = {
            id: null,
            movieName: null
        };
        arrData.push(objData);
    }
    else {
        objData = {
            id: data.movieId,
            movieName: data.movieName
        };
        arrData.push(objData);
    }

    res.json(arrData);
}));

module.exports = router;