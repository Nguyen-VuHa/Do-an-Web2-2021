const express = require('express');
const asyncHandler = require('express-async-handler');
const Movies = require('../models/movies');
const showTime = require('../models/showtime');
const Cinema = require('../models/theater');
const router = express.Router();

router.use(function(req, res, next){
    res.locals.title = 'Lịch Chiếu';
    next();
});

router.get('/',asyncHandler(async function(req, res) {
   res.render('showtimes');
}));

router.get('/api/movie',asyncHandler(async function(req, res) {
    const data = await Movies.findAll();
    var dataMovies = [];
    var someday = new Date();
    data.forEach(item => {
        var getDate = new Date(item.premiereDate);
        if(someday.getTime() >= getDate.getTime())
        {
            var obData_hdc = {};
            obData_hdc = {
                movieId: item.movieId,
                movieName: item.movieName,
                specific: item.specific,
                poster: `http://localhost:3000/api/image/${item.movieId}/1`
            }
            dataMovies.push(obData_hdc);
        }  
    });

    res.json(dataMovies);
}));


router.get('/api/date/:id', asyncHandler(async function(req, res) {
    const showtime = await showTime.findByIdMovies(req.params.id);
    var cinemas = await Cinema.findAll();
    const cinema = [];
    const dates = [];

    for(let i = 0; i < 14; i++)
    {
        var dateString = addDays(i).getFullYear() + "-" + (addDays(i).getMonth() + 1) + "-" + addDays(i).getDate();
        var date = new Date(dateString);
        dates.push(date);
    }

    dates.forEach(idate => {
        showtime.forEach(item => { 
            if(idate.getTime() === item.startDate.getTime())
            {
                let nameCinema = "";
                var objectItem = {};
                var arrayStTime = [];
                cinemas.forEach(items => {
                    if(items.id === item.idCinema)
                    {
                        nameCinema = items.nameTheater;
                        return;
                    }
                });
                arrayStTime.push(item.startTime);

                cinema.forEach(items => {
                    
                    if(items.idCinema === item.idCinema)
                    {
                        items.startTime.push(item.startTime);
                    }
                });

                const data = cinema.filter(items => items.idCinema === item.idCinema);

                if(data.length > 0)
                    return;
                else
                {
                    objectItem = {
                        idShow: item.idShowtime,
                        idMovies: item.idMovies,
                        idCinema: item.idCinema,
                        nameCinema: nameCinema,
                        startDate: item.startDate,
                        startTime: arrayStTime,
                    };
                }

                cinema.push(objectItem);
            }
        })
    })

    res.json(cinema);
}))

router.get('/api/date', asyncHandler(async function(req, res) {
    var arrayDate = [];
    var objectDate = {};
    let strDay = '';
    let datetime = '';
    for(let i = 0; i < 14; i++)
    {
        strDay = addDays(i).getDate() + "-" + (addDays(i).getMonth() + 1);
        datetime = addDays(i).getFullYear() + "-" + (addDays(i).getMonth() + 1) + "-" +  addDays(i).getDate();
        objectDate = {
            date: getDate(addDays(i).getDay()),
            day: strDay,
            datetime: datetime,
        }
        arrayDate.push(objectDate);
    }

    res.json(arrayDate);
}));

 function addDays(days) {
    var now = new Date();
    now.setDate(now.getDate() + parseInt(days));
    return now;
  };

function getDate(current_day) {
    let date_name = '';
    if(current_day === 0)
        date_name = 'CN';
    if(current_day === 1)
        date_name = 'Thứ 2';
    if(current_day === 2)
        date_name = 'Thứ 3';
    if(current_day === 3)
        date_name = 'Thứ 4';
    if(current_day === 4)
        date_name = 'Thứ 5';
    if(current_day === 5)
        date_name = 'Thứ 6';
    if(current_day === 6)
        date_name = 'Thứ 7';
  
    return date_name;
}

module.exports = router;