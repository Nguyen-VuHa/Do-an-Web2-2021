const express = require('express');
const asyncHandler = require('express-async-handler');
const showTime = require('../models/showtime');
const Movies = require('../models/movies');
const User = require('../models/useraccount');
const Cinema = require('../models/theater');
const Bookings = require('../models/booking');
const Tickets = require('../models/ticket');
const Notification = require('../models/notification');
const ensureLoggedIn = require('../middlewares/ensure_logged_in');
const router = express.Router();

const nodemailer = require('../sendmail');
const Booking = require('../models/booking');
const Ticket = require('../models/ticket');

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

    let countSeats = 0;
    const bookings = await Booking.findByIdShow(idshow);
    const tickets = await Ticket.findAll();

    bookings.forEach(item => {
        tickets.forEach(items => {
            if(items.idBK === item.idBK)
            {
                countSeats += 1;
            }
        })
    })
    
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
            idCinema: dataCinema.id,
            nameCinema: dataCinema.nameTheater,
            totalSeats: (dataCinema.sizeHorizontal * dataCinema.sizeVertical),
            chooseSeats: (dataCinema.sizeHorizontal * dataCinema.sizeVertical) - countSeats,
        }   

        var timeStart = dataShow.startDate.getFullYear() + "-" + (dataShow.startDate.getMonth() + 1) + "-" + dataShow.startDate.getDate() + " " + dataShow.startTime;
        let dateStart = new Date(timeStart);
        let dateEnd = new Date(dateStart.getTime() + (dataMovies.time * 60 * 1000));
        var moviesTime = dataShow.startDate.getFullYear() + "-" + (dataShow.startDate.getMonth() + 1) + "-" + dataShow.startDate.getDate() + " " + dateEnd.getHours() + ":" + dateEnd.getMinutes();
    
        var objectShowtime = {
            idshow: dataShow.idShowtime,
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
    const bookings = await Bookings.findByIdShow(idshow);
    const tickets = await Tickets.findAll();
    arrSeats = [];

    bookings.forEach(item => {
        tickets.forEach(tickItem => {
            if(tickItem.idBK === item.idBK)
            {
                arrSeats.push(tickItem.idSeats)
            }
        })
    });

    var objectData = {
        sizeHorizontal: dataCinema.sizeHorizontal,
        sizeVertical: dataCinema.sizeVertical,
        fare: dataShow.fare,
        selectedSeat: arrSeats
    }
    
    res.json(objectData)
}));

router.post('/bookings-payments' , asyncHandler(async function(req, res) {
    var objectData = req.body;
    const user = await User.findByCode(objectData.idUser);
    const bookings = await Bookings.findByIdShow(objectData.idShowtime);
    const tickets = await Tickets.findAll();
    const movies = await Movies.findByMovieId(objectData.idMovie);
    const cinemas = await Cinema.findById(objectData.idCinema);
    arrSeats = [];
    let checkSeats;

    var arraySeats = objectData.arrSeats;

    bookings.forEach(item => {
        tickets.forEach(tickItem => {
            if(tickItem.idBK === item.idBK)
            {
                arrSeats.push(tickItem.idSeats)
            }
        })
    });

    arraySeats.forEach(item => {
        if(arrSeats.indexOf(item) === -1)
        {
            checkSeats = true;
        }
        else {
            checkSeats = false;
            return;
        }
    })

    if(checkSeats === true)
    {
        Bookings.create({
                idBK: objectData.idBooking,
                idUser: objectData.idUser,
                idShow: objectData.idShowtime,
                timeOfBooking: objectData.timeBooking,
                totalPrice: objectData.totalPrice,
            });

        let today = new Date();

        Notification.create({
            idUser:  objectData.idUser,
            linkimg: `http://localhost:3000/api/image/${movies.movieId}/1`,
            time: today,
            status: 0,
            type: 'link',
            message: `Bạn vừa hoàn thành đặt vé cho bộ phim <span>${movies.movieName}</span>. Kiểm tra gmail hoặc tin nhắn để nhận mã vé cũng như thông tin về vé. Chúc bạn xem phim vui vẻ <3`,
            messbold: '',
        })

        for(let i = 0; i < arraySeats.length; i++)
        {
            Tickets.create({
                idTicket: Generate(),
                idBK: objectData.idBooking,
                idSeats: arraySeats[i],
                price: objectData.fare
            });
        }
        
        user.surplus -=  objectData.totalPrice;
        await user.save();
        var date = new Date(objectData.timeBooking);
        var time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
        var urlQRcode = 'https://cgv-cinema-movie.herokuapp.com/';

        var objectSendmail = {
            fullname: user.fullname,
            nameMovie: movies.movieName,
            idTicket: objectData.idBooking,
            cinema: cinemas.nameTheater,
            address: cinemas.addressTheater,
            timeTick: time,
            showtime: objectData.showtime,
            totalPrice: objectData.totalPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            idSeats: objectData.arrSeats,
            urlQRcode: urlQRcode,
        };

    
        var link = "#";
        await nodemailer.sendBooking(user.email, 'CGV Việt Nam | Thông Tin Vé Phim', link, objectSendmail);

        res.json(true);
    }
    else {
        res.json(false);
    }
    
}))

function Generate() {
    const hex = "0123456789ABCDEF";
    const model = "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx";
    var str = "";
    for (var i = 0; i < model.length; i++) {
      var rnd = Math.floor(Math.random() * hex.length);
      str += (model[i] == "-" || model[i] == "4") ?  model[i] : hex[rnd];
    }
    return str.toLowerCase();
}

module.exports = router;