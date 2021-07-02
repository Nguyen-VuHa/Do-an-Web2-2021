const express = require('express');
const Movies = require('../models/movies');
const showTime = require('../models/showtime');
const Theater = require('../models/theater');
const District = require('../models/district');
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
        idMovies: req.params.id,
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

router.get('/api/:id', asyncHandler(async function(req, res) {
    const dataShowtime = await showTime.findByIdMovies(req.params.id);
    const dataCinema = await Theater.findAll();
    const dataDistr = await District.findAll();
    const data = [];
    const districts = [];

    var now = new Date();
    dataShowtime.forEach(element => {
        var arrayIdshow = [];
        var arrayStartdate = [];
        var arrayStarttime = [];

        var timeStart = element.startDate.getFullYear() + "-" + (element.startDate.getMonth() + 1) + "-" + element.startDate.getDate() + " " + element.startTime;
        let dateStart = new Date(timeStart);
        if (dateStart.getTime() >= now.getTime()) {
            var nameCinema = '';
            var idDistrict = '';
            dataCinema.forEach(cinema => {
                if(cinema.id === element.idCinema)
                {
                    nameCinema = cinema.nameTheater;
                    idDistrict = cinema.idDistr;
                    return;
                }
            });

            dataDistr.forEach(distr => {
                if(distr.id === idDistrict)
                {
                    if(districts.filter(items => items.id === idDistrict).length > 0)
                        return;
                    else
                    {
                        var obj = {
                            id: distr.id,
                            nameDistr: distr.district
                        }
                        districts.push(obj);
                        return;
                    }
                }
            });

            arrayIdshow.push(element.idShowtime);
            arrayStartdate.push(element.startDate);
            arrayStarttime.push(element.startTime);

            var check = data.filter(items => items.idCinema === element.idCinema);

            if(check.length > 0) {
                data.forEach(items => {
                    if(items.idCinema === element.idCinema) {
                        items.idShow.push(element.idShowtime);
                        items.time.startDate.push(element.startDate);
                        items.time.startTime.push(element.startTime);
                    }
                })
            }
            else
            {
                var objectData = {
                    idShow: arrayIdshow,
                    idMovies: element.idMovies,
                    idDistr: idDistrict,
                    idCinema: element.idCinema,
                    cinemaName: nameCinema,
                    time: {
                        startDate: arrayStartdate,
                        startTime: arrayStarttime,
                    }
                };
    
                data.push(objectData);
            }
        }
    });

    var objectData = {
        districts: districts,
        showTimes: data,
    };

    res.json(objectData);
}));

module.exports = router;