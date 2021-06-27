const express = require('express');
const asyncHandler = require('express-async-handler');
const showTime = require('../models/showtime');
const Movies = require('../models/movies');
const User = require('../models/useraccount');
const Cinema = require('../models/theater');
const Booking = require('../models/booking');
const Ticket = require('../models/ticket');
const ensureLoggedIn = require('../middlewares/ensure_logged_in');
const router = express.Router();

router.use(ensureLoggedIn);

router.use(function(req, res, next){
    res.locals.title = 'Booking Movies';
    next();

});

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    return hours+':'+minutes;
}

router.get('/',asyncHandler(async function(req, res) {
    const { idshow, idmovie, idcinema } = req.query;
    const idUser = req.currentUser.code;
   

    const dataShow = await showTime.findById(idshow);
    const dataMovies = await Movies.findByMovieId(idmovie);
    const dataUser = await User.findByCode(idUser);
    const dataCinema = await Cinema.findById(idcinema);

    if(dataShow && dataMovies && dataUser && dataCinema)
    {
        var objectUser = {
            email: dataUser.email,
            numberphone: dataUser.numberphone
        }
    
        var objectMovies = {
            movieId: dataMovies.movieId,
            movieName: dataMovies.movieName,
            category: dataMovies.category,
            time: dataMovies.time,
        }

        var objectCinema = {
            nameCinema: dataCinema.nameTheater,
            totalSeats: (dataCinema.sizeHorizontal * dataCinema.sizeVertical)
        }   

        var timeStart = dataShow.startDate.getFullYear() + "-" + (dataShow.startDate.getMonth() + 1) + "-" + dataShow.startDate.getDate() + " " + dataShow.startTime;
        let dateStart = new Date(timeStart);
        let dateEnd = new Date(dateStart.getTime() + (dataMovies.time * 60 * 1000));
        var moviesTime = dataShow.startDate.getFullYear() + "-" + (dataShow.startDate.getMonth() + 1) + "-" + dataShow.startDate.getDate() + " " + dateEnd.getHours() + ":" + dateEnd.getMinutes();
    
        var objectShowtime = {
            time: `${timeStart} ~ ${moviesTime}`,
            fare: dataShow.fare
        }   

        var data = {
            user: objectUser,
            movie: objectMovies,
            cinema: objectCinema,
            showtime: objectShowtime
        }

        res.render('bookings', { data });
    }
    else 
        res.render('page404');
}));

// API Bookings

router.get('/api/bookingstep',asyncHandler(async function(req, res) {
    const { idcinema, idshow} = req.query;
    const dataCinema = await Cinema.findById(idcinema);
    const dataShow = await showTime.findById(idshow);

    var objectData = {
        sizeHorizontal: dataCinema.sizeHorizontal,
        sizeVertical: dataCinema.sizeVertical,
        fare: dataShow.fare,
    }
    
    res.json(objectData)
}));



module.exports = router;