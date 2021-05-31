const express = require('express');
const router = express.Router();
const Movies = require('../models/movies');
const asyncHandler = require('express-async-handler');
const ensureLoggedIn = require('../middlewares/ensure_logged_in');

router.use(ensureLoggedIn);

router.use(function(req, res, next){
    res.locals.title = 'Admin';
    next();
});

function randoomCode(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
   
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
   
    return text;
}

router.get('/',asyncHandler(async function(req, res) {
    let movieid = "F0x" + randoomCode(4);
    const db = await Movies.findByMovieId(movieid);
    if(db)
        movieid = "F0x" + randoomCode(4);
    else
        res.render('adMoreMovies', { movieid });
 }));


// [GET] API INFO 
router.get('/api/data', asyncHandler(async function(req, res) {
    const db = await Movies.findAll();
    var data = [];

    db.forEach(item => {
        var obData = {};
        obData = {
           movieId: item.movieId,
           movieName: item.movieName,
           time: item.time,
           premiereDate: item.premiereDate,
           endDate: item.endDate
        }
        data.push(obData);
    });
    if(data.length <= 0)
        data = null;
    
    res.json(data);
 }));

 router.get('/api/image', asyncHandler(async function(req, res) {
    const db = await Movies.findAll();
    var data = [];
    
    db.forEach(item => {
        var obData = {};
        obData = {
           movieId: item.movieId,
           poster1: item.poster1.toString(),
           poster2: item.poster2.toString(),
           poster3: item.poster3.toString(),
           poster4: item.poster4.toString()
        }
        data.push(obData);
    });
    res.json(data);
 }));



// [POST] API Image
 router.post('/movies',asyncHandler(async function(req, res){
    const { movieId, namefilm, time, startdate, enddate } = req.body.data;
    const data = await Movies.findByMovieId(movieId);
    if(!data)
    {
        Movies.create({
            movieId: movieId,
            movieName:  namefilm,
            time: time,
            premiereDate: startdate,
            endDate: enddate,
            poster1: req.body.imageData.poster1,
            poster2: req.body.imageData.poster2,
            poster3: req.body.imageData.poster3,
            poster4: req.body.imageData.poster4,
        });
    }
    else {
        data.movieId = movieId,
        data.movieName =  namefilm,
        data.time = time,
        data.premiereDate = startdate,
        data.endDate = enddate,
        data.poster1 = req.body.imageData.poster1,
        data.poster2 = req.body.imageData.poster2,
        data.poster3 = req.body.imageData.poster3,
        data.poster4 = req.body.imageData.poster4

        await data.save();
    }
 }));

module.exports = router;