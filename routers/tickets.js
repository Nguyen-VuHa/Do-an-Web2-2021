const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const showTime = require('../models/showtime');
const Movies = require('../models/movies');
const Cinema = require('../models/theater');
const Bookings = require('../models/booking');
const Tickets = require('../models/ticket');

router.use(function(req, res, next){
    res.locals.title = 'Ticket';
    next();
});

function customTime(time) {
    var hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
    var minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    var day = time.getDate() < 10 ?  `0${time.getDate()}` : time.getDate();
    var month = (time.getMonth() + 1) < 10 ?  `0${time.getMonth() + 1}` : time.getMonth() + 1;

    return `${hours}:${minutes} ${day}/${month}/${time.getFullYear()}`;
}

router.get('/',asyncHandler(async function(req, res) {
    const { idBK , idMovie , idCinema, idShow } = req.query;
    if(idBK && idMovie && idCinema) {
        const bookings = await Bookings.findByIdBK(idBK);
        const tickets = await Tickets.findAll();
        const movies = await Movies.findByMovieId(idMovie);
        const cinema = await Cinema.findById(idCinema);
        const showtime = await showTime.findById(idShow);
        var arraySeats = '';

        if(bookings && movies && cinema && showtime) 
        {
            tickets.forEach(tickItem => {
                if(tickItem.idBK === idBK)
                {
                    arraySeats += `${tickItem.idSeats} ,`;
                }
            })

            var timeBk = new Date(bookings.timeOfBooking);
            var startDate = new Date(`${showtime.startDate.getFullYear()}-${showtime.startDate.getMonth() + 1}-${showtime.startDate.getDate()} ${showtime.startTime}`);
            console.log(arraySeats);

            var objectData = {
                ticketCode: bookings.idBK,
                nameMovie: movies.movieName,
                nameCinema: cinema.nameTheater,
                addressCinema: cinema.addressTheater,
                timeBooking: customTime(timeBk),
                timeShow: customTime(startDate),
                seats: arraySeats,
            }
            res.render('ticket' , { objectData });
        }
        else {
            res.render('page404');
        }
       
    }
    else {
        res.render('page404');
    }
    
}));

module.exports = router;