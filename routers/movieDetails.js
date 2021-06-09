const express = require('express');
const Movies = require('../models/movies');
const asyncHandler = require('express-async-handler');
const router = express.Router();

router.use(function(req, res, next){
    res.locals.title = 'Movies Details';
    next();
});

router.get('/',asyncHandler(async function(req, res) {
    res.render('page404');
}));

router.get('/:id',asyncHandler(async function(req, res) {
    const data = await Movies.findByMovieId(req.params.id);
    var d = new Date(data.premiereDate);
    var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    const obData = {
        movieName: data.movieName,
        specific: data.specific,
        describe: data.describe,
        category: data.category,
        directors: data.directors,
        mainActor: data.mainActor,
        premiereDate: date,
        time: data.time,
        poster1: `http://localhost:3000/api/image/${data.movieId}/1`,
        poster2: `http://localhost:3000/api/image/${data.movieId}/2`,
        poster3: `http://localhost:3000/api/image/${data.movieId}/3`,
        poster4: `http://localhost:3000/api/image/${data.movieId}/4`,
        trailer: data.trailer,
    };
    res.render('movieDetails' , { obData });
    
}));

module.exports = router;