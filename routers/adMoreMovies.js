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
           endDate: item.endDate,
        }
        data.push(obData);
    });
    if(data.length <= 0)
        data = null;
    
    res.json(data);
 }));

 router.get('/api/data/:id', asyncHandler(async function(req, res) {
    const db = await Movies.findByMovieId(req.params.id);

    var obData = {};
    obData = {
        movieId: db.movieId,
        movieName: db.movieName,
        time: db.time,
        premiereDate: db.premiereDate,
        endDate: db.endDate,
        specific: db.specific,
        describe: db.describe,
        category: db.category,
        directors: db.directors,
        mainActor: db.mainActor,
        poster1: `http://localhost:3000/admin/api/image/${req.params.id}/1`,
        poster2: `http://localhost:3000/admin/api/image/${req.params.id}/2`,
        poster3: `http://localhost:3000/admin/api/image/${req.params.id}/3`,
        poster4: `http://localhost:3000/admin/api/image/${req.params.id}/4`,
        trailer: db.trailer,
    }
   
    res.json(obData);
 }));

 router.get('/api/image/:id/1', asyncHandler(async function(req, res) {
    const db = await Movies.findByMovieId(req.params.id);
    var poster1 = db.poster1;
    if(!db || !db.poster1)
    {
        res.status(404).send('File not found!');
    }
    else {

        const im = poster1.toString().split(",")[1];
        const image = Buffer.from(im, 'base64');

        res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': image.length
        });

        res.end(image);
    }
 }));

 router.get('/api/image/:id/2', asyncHandler(async function(req, res) {
    const db = await Movies.findByMovieId(req.params.id);
    var poster2 = db.poster2;
    if(!db || !db.poster2)
    {
        res.status(404).send('File not found!');
    }
    else {

        const im = poster2.toString().split(",")[1];
        const image = Buffer.from(im, 'base64');

        res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': image.length
        });

        res.end(image);
    }
 }));

 router.get('/api/image/:id/3', asyncHandler(async function(req, res) {
    const db = await Movies.findByMovieId(req.params.id);
    var poster3 = db.poster3;
    if(!db || !db.poster3)
    {
        res.status(404).send('File not found!');
    }
    else {

        const im = poster3.toString().split(",")[1];
        const image = Buffer.from(im, 'base64');

        res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': image.length
        });

        res.end(image);
    }
 }));

 router.get('/api/image/:id/4', asyncHandler(async function(req, res) {
    const db = await Movies.findByMovieId(req.params.id);
    var poster4 = db.poster4;
    if(!db || !db.poster4)
    {
        res.status(404).send('File not found!');
    }
    else {

        const im = poster4.toString().split(",")[1];
        const image = Buffer.from(im, 'base64');

        res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': image.length
        });

        res.end(image);
    }
 }));

// [POST] API Image
 router.post('/movies',asyncHandler(async function(req, res){
    const { movieId, namefilm, time, startdate, enddate, specific, describe, category, directors, mainActor, chanelId} = req.body.data;
    const data = await Movies.findByMovieId(movieId);
    let status = true;
    if(!data)
    {
        Movies.create({
            movieId: movieId,
            movieName:  namefilm,
            time: time,
            premiereDate: startdate,
            endDate: enddate,
            specific: specific,
            describe: describe,
            category: category,
            directors:  directors,
            mainActor:  mainActor,
            poster1: req.body.imageData.poster1,
            poster2: req.body.imageData.poster2,
            poster3: req.body.imageData.poster3,
            poster4: req.body.imageData.poster4,
            trailer: chanelId,
        });
        res.json(status);
    } else {
        data.movieId = movieId,
        data.movieName =  namefilm,
        data.time = time,
        data.premiereDate = startdate,
        data.endDate = enddate,
        data.specific = specific,
        data.describe = describe,
        data.category = category,
        data.directors = directors,
        data.mainActor = mainActor,
        data.poster1 =  req.body.imageData.poster1,
        data.poster2 = req.body.imageData.poster2,
        data.poster3 = req.body.imageData.poster3,
        data.poster4 = req.body.imageData.poster4,
        data.trailer = chanelId,

        await data.save();
        res.json(status);
    }
 }));

 router.post('/api/deleteMovie', asyncHandler(async function(req, res) {
    const idMovie = req.body.idMovie;
    if(idMovie)
    {
        await Movies.deleteBymoviesId(idMovie);
        res.json(true);
    }
    else
        res.json(false);
 }));

module.exports = router;