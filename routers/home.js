const express = require('express');
const UserAccount = require('../models/useraccount');
const Movies = require('../models/movies');
const Notification = require('../models/notification');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const Booking = require('../models/booking');
const Ticket = require('../models/ticket');
const showTime = require('../models/showtime');
const Theater = require('../models/theater');
const router = express.Router();

router.use(function(req, res, next){
    res.locals.title = 'CGV Cinemas Việt Nam  &#8226; Trang Chủ';
    next();
});

router.get('/', asyncHandler(async function(req, res){
    var userId = req.session.userId;
    const data = await Movies.findAll();
    var list_film_hdc = [];
    var list_film_cmc = [];
    var someday = new Date();
    data.forEach(item => {
        var getDate = new Date(item.premiereDate);
        var endDate = new Date(item.endDate);
        if(someday.getTime() >= getDate.getTime() && someday.getTime() <= endDate.getTime())
        {
            var obData_hdc = {};
            var dStart = new Date(item.premiereDate);
            var dEnd = new Date(item.endDate);
            var dateS = dStart.getDate() + "/" + (dStart.getMonth() + 1);
            var dateE = dEnd.getDate() + "/" + (dEnd.getMonth() + 1) + "/" + dEnd.getFullYear();
            obData_hdc = {
                movieId: item.movieId,
                movieName: item.movieName,
                premiereDate: dateS,
                endDate: dateE,
                specific: item.specific,
                poster: `http://localhost:3000/api/image/${item.movieId}/1`
            }
            list_film_hdc.push(obData_hdc);
        }  
        else if(getDate.getTime() >= someday.getTime()){
            var obData_cmc = {};
            var d = new Date(item.premiereDate);
            var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
            obData_cmc = {
                movieId: item.movieId,
                movieName: item.movieName,
                premiereDate: date,
                endDate: item.endDate,
                specific: item.specific,
                poster: `http://localhost:3000/api/image/${item.movieId}/1`
            }
            list_film_cmc.push(obData_cmc);
        }
    });
    if(userId)
    {
        res.render('home', { list_film_cmc, list_film_hdc });
    }
    else {
        const dataId = await UserAccount.findByCode(userId);
        res.render('home', { dataId, list_film_cmc, list_film_hdc });
    }
}));

router.get('/active/:id', asyncHandler(async function(req, res) {
    const code = req.params.id;
    const value = await UserAccount.findByCode(code);
    if(value) {
        if(value.active === '')
        {
            res.redirect('/');
        }
        else
        {
            try{
                value.active = '';
                await value.save();
                res.redirect('/login' + `?username=${value.email}&password=${value.password}`);
            }catch
            {
                res.redirect('/error');
            }
        }
    }
    else
    {
        res.redirect('/');
    }
}));

router.get('/login', asyncHandler(async function(req, res){ 
    const { username, password } = req.query;
    const foundActive = await UserAccount.findByEmail(username);

    if(!foundActive) {
        res.redirect('/error');
    }
    else if(foundActive.password === password)
    {
        req.session.userId = foundActive.code;
        res.redirect('/');
    }
    else
    {
        res.redirect('/error');
    }
}));

router.post('/login',asyncHandler(async function(req, res){
    const { email, password } = req.body;
    const found = await UserAccount.findByEmail(email);
    if(!found)
    {
        var objectMessage = {
            error: false,
            title_toast :"Warning!",
            message: 'Email này chưa được đăng ký hoặc không tồn tại!',
            type: "warning",
        }
        res.json(objectMessage);
    }
    else if (found && bcrypt.compareSync(password, found.password))
    {
        //null
        if(found.active === ''){
            req.session.userId = found.code;
            res.json(true);
        }
        else
        {
            var objectMessage = {
                title_toast :"Warning!",
                message: 'Bạn chưa xác nhận tài khoản!',
                type: "warning",
            }
            res.json(objectMessage);
        }
    }
    else {
        var objectMessage = {
            title_toast :"Warning!",
            message: 'Sai tài khoản hoặc mật khẩu!',
            type: "warning",
        }
        res.json(objectMessage);
    }
}));


router.get('/logout', function(req, res) {
    delete req.session.userId;
    res.redirect('/');
})

// API DATA HOMEPAGE
router.get('/api/data/header',asyncHandler(async function(req, res) {
    const data = await Movies.findAll();

    var db = randomProperty(data);
    var arrayData = [];
    var obDataHeader = {
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
        trailer: db.trailer,
    }
    arrayData.push(obDataHeader);
    var obDataPoster = {
        poster1: `http://localhost:3000/api/image/${db.movieId}/1`,
        poster2: `http://localhost:3000/api/image/${db.movieId}/2`,
        poster3: `http://localhost:3000/api/image/${db.movieId}/3`,
    }
    arrayData.push(obDataPoster);

    res.json(arrayData);
}));

function randomProperty(obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

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


//API notification 
router.get('/api/notification/:id', asyncHandler(async function(req, res) {
    const noti = await Notification.findByIdUser(req.params.id);
    res.json(noti);
}));

router.post('/api/notification/:id', asyncHandler(async function(req, res) {
    const { iduser, status } = req.body;
    const noti = await Notification.findByUserStatus(iduser, status);

    noti.forEach(item => {
        Notification.update({
            status: 2,
        }, {
            where: {
                idUser: item.idUser,
                status: item.status
            }
        })
    })
    res.json(true);
}));

router.post('/api/notiuuid/:id', asyncHandler(async function(req, res) {
    const noti = await Notification.findByUuid(req.params.id);

    noti.status = req.body.status;
    await noti.save();
    
    res.json(true);
}));


router.get('/history-booking/:id', asyncHandler(async function(req, res) {
    const bookings = await Booking.findByIdUser(req.params.id);
    const tickets = await Ticket.findAll();
    const showtimes = await showTime.findAll();
    const movies = await Movies.findAll();
    const cinemas = await Theater.findAll();
    const arraySeats = [];
    const arrayIdBK = [];
    const arrayShow = [];
    const nameMovie = [];
    const nameCinema = [];
    const arrayTime = [];

    bookings.forEach(item => {
        var obj = {
            idBK: item.idBK,
            idShow: item.idShow
        }
        arrayIdBK.push(obj);
        let time = `${item.timeOfBooking.getHours()}:${item.timeOfBooking.getMinutes()} ${item.timeOfBooking.getDate()}/${item.timeOfBooking.getMonth() + 1}/${item.timeOfBooking.getFullYear()}`;
        arrayTime.push(time);
    })
    
    arrayIdBK.forEach(item => {
        var arrayTemp = [];
        tickets.forEach(items => {
            if(items.idBK === item.idBK)
            {
                arrayTemp.push(items.idSeats);
            }
        })
        arraySeats.push(arrayTemp);
        showtimes.forEach(items => {
            if(items.idShowtime === item.idShow)
            {
                var object = {
                    idMovies: items.idMovies,
                    idCinema: items.idCinema,   
                }
                arrayShow.push(object);
                return;
            }
        })
    })

    arrayShow.forEach(item => {
        movies.forEach(items => {
            if(items.movieId === item.idMovies)
            {
                nameMovie.push(items.movieName);
                return;
            }
        })
        cinemas.forEach(items => {
            if(items.id === item.idCinema)
            {
                nameCinema.push(items.nameTheater);
                return;
            }
        })
    })
    
    var objectData = {
        movie: nameMovie,
        cinema: nameCinema,
        seats: arraySeats,
        showtime: arrayShow,
        time: arrayTime,
    }

    res.render('historyBooking', { objectData });
}))

module.exports = router;
