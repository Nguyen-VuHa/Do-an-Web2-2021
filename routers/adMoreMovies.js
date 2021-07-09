const express = require('express');
const router = express.Router();
const Movies = require('../models/movies');
const District = require('../models/district');
const Theaters = require('../models/theater');
const showTime = require('../models/showtime');
const Booking = require('../models/booking');
const { Op } = require('sequelize');
const asyncHandler = require('express-async-handler');
const ensureLoggedIn = require('../middlewares/ensure_logged_admin');
const local = require('../local.json');

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

 router.get('/showtime',asyncHandler(async function(req, res) {
   res.render('adShowtime');
 }));

 router.post('/showtime/add',asyncHandler(async function(req, res) {
     const objecData = req.body;
    var checkId = await showTime.findById(objecData.data.id_showtime);
   
    if(checkId){
        res.json(false);
    }
    else
    {
        showTime.create({
            idShowtime: objecData.data.id_showtime,
            idMovies:  objecData.idMovies,
            idCinema: objecData.idCinema,
            startDate: objecData.tempDate,
            startTime: objecData.data.startTime,
            endDate:  objecData.tempDate,
            endTime: objecData.data.endTime,
            fare: objecData.data.fare,
        });
        res.json(true);
    }
}));

 router.get('/showtime/api/date',asyncHandler(async function(req, res) {
    var arrayDate = [];
    var objectDate = {};
    let strDay = '';
    let datetime = '';
    for(let i = 0; i < 14; i++)
    {
        var month = (addDays(i).getMonth() + 1);
        var day = addDays(i).getDate();

        strDay = addDays(i).getDate() + "-" + (addDays(i).getMonth() + 1);

        if(month.toString().length > 1)
            month = "" + (addDays(i).getMonth() + 1);
        else
            month = "0" + (addDays(i).getMonth() + 1);

        if(day.toString().length > 1)
            day = "" + addDays(i).getDate();
        else
            day = "0" + addDays(i).getDate();

        datetime = addDays(i).getFullYear() + "-" + month + "-" +  day;

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

router.get('/showtime/api/list-data', asyncHandler(async function(req, res) {
    const movies = await Movies.findAll();
    const cinema = await Theaters.findAll();
    var listDataM = [];
    var listDataC = [];
    var listMovies = {};
    var listCinema = {};
    var now = new Date();

    movies.forEach(item => {
        var getDate = new Date(item.premiereDate);
        if(now.getTime() >= getDate.getTime())
        {
            listMovies = {
                idMovie: item.movieId,
                movieName: item.movieName
            };
            listDataM.push(listMovies);
        }
    })

    cinema.forEach(item => {
        listCinema = {
            idCinema: item.id,
            cinemaName: item.nameTheater
        };
        listDataC.push(listCinema);
    })
   
    var objectData = {
        movies: listDataM,
        cinema: listDataC
    };
    res.json(objectData);
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

router.get('/api/local', function(req, res){
    res.json(local);
})

router.get('/api/district', asyncHandler(async function(req, res){
    const db = await District.findAll();
    var data = [];

    db.forEach(item => {
        var obData = {};
        obData = {
           id: item.id,
           district: item.district
        }
        data.push(obData);
    });
    if(data.length <= 0)
        data = null;
    
    res.json(data);
}));

router.post('/district', asyncHandler(async function(req, res){
    const { id, district } = req.body;
    const checkId = await District.findById(id);
    if(checkId === null)
    {
        District.create({
            id: id,
            district: district,
        });
        res.json(true)
    }
    else
        res.json(false)
}));

router.post('/theater', asyncHandler(async function(req, res){
    const data = req.body.data;
    const checkId = await Theaters.findById(data.th_id);
    if(checkId === null)
    {
        Theaters.create({
            id: data.th_id,
            idDistr: req.body.option,
            nameTheater: data.th_name,
            typeTheater: req.body.type,
            addressTheater: data.th_adress,
            subAddress: data.th_subadress,
            latTheater: data.th_lat,
            lngTheater: data.th_lng,
            sizeHorizontal: data.horizontal_size,
            sizeVertical: data.vertical_size,
        });
        res.json(true);
    }
    else
        res.json(false);
}));

router.get('/revenue', function(req, res) {
    res.render('income');
})

router.get('/revenue/api', asyncHandler(async function(req, res) {
    var dataBooking;
    if(req.query.fromdate !== 'undefined' && req.query.todate !== 'undefined')
    {
        var startDate = new Date(req.query.fromdate + " 00:00:00");
        var endDate = new Date(req.query.todate + " 00:00:00");
        dataBooking = await Booking.findAll({
            where: 
            {
                timeOfBooking: 
                {
                    [Op.between]: [startDate,endDate]
                }
            }
        });;
    }
    else
        dataBooking = await Booking.findAll();
    
    const showtime = await showTime.findAll();
    const cinema = await Theaters.findAll();
    let idCinema, nameCinema;
    let arrShow = [];
    if(dataBooking) {
        dataBooking.forEach(item => {
            let count = 0;
            count += 1;
            if(arrShow.filter(u => u.idShow === item.idShow).length > 0)
            {
                arrShow.forEach(items => {
                    if(items.idShow === item.idShow)
                    {
                        items.countTicket += 1;
                        items.totalPrice += item.totalPrice;
                        return;
                    }
                })
            }
            else
            {
                var obj = {
                    idShow: item.idShow,
                    totalPrice: item.totalPrice,
                    countTicket: count,
                }
                arrShow.push(obj);
            }
        })
    
        let arrData = [];
      
        for(let i = 0; i < arrShow.length; i++) {
            showtime.forEach(item => {
                if(arrShow[i].idShow === item.idShowtime)
                {
                    idCinema = item.idCinema;
                    return;
                }
            })
        
            cinema.forEach(item => {
                if(idCinema === item.id)
                {
                    nameCinema = item.nameTheater;
                }
            })
        
            if(arrData.filter(u => u.idCinema === idCinema).length > 0)
            {
                arrData.forEach(item => {
                    if(item.idCinema === idCinema)
                    {
                        item.countTicket += arrShow[i].countTicket;
                        item.totalPrice += arrShow[i].totalPrice;
                        return;
                    }
                })
            }
            else
            {
                var option = {
                    countTicket: arrShow[i].countTicket,
                    totalPrice: arrShow[i].totalPrice,
                    nameCinema: nameCinema,
                    idCinema: idCinema,
                }
            
                arrData.push(option);
            }
        }
        
        res.json(arrData);
    }
    else {
        dataBooking.forEach(item => {
            let count = 0;
            count += 1;
            if(arrShow.filter(u => u.idShow === item.idShow).length > 0)
            {
                arrShow.forEach(items => {
                    if(items.idShow === item.idShow)
                    {
                        items.countTicket += 1;
                        items.totalPrice += item.totalPrice;
                        return;
                    }
                })
            }
            else
            {
                var obj = {
                    idShow: item.idShow,
                    totalPrice: item.totalPrice,
                    countTicket: count,
                }
                arrShow.push(obj);
            }
        })
    
        let arrData = [];
        for(let i = 0; i < arrShow.length; i++) {
            showtime.forEach(item => {
                if(arrShow[i].idShow === item.idShowtime)
                {
                    idCinema = item.idCinema;
                    return;
                }
            })
        
            cinema.forEach(item => {
                if(idCinema === item.id)
                {
                    nameCinema = item.nameTheater;
                }
            })
        
            if(arrData.filter(u => u.idCinema === idCinema).length > 0)
            {
                arrData.forEach(item => {
                    if(item.idCinema === idCinema)
                    {
                        item.countTicket += arrShow[i].countTicket;
                        item.totalPrice += arrShow[i].totalPrice;
                        return;
                    }
                })
            }
            else
            {
                var option = {
                    countTicket: arrShow[i].countTicket,
                    totalPrice: arrShow[i].totalPrice,
                    nameCinema: nameCinema,
                    idCinema: idCinema,
                }
            
                arrData.push(option);
            }
        }
        
        res.json(arrData);
    }
  
}));

router.get('/revenue-movie/api', asyncHandler(async function(req, res) {
    var dataBooking;
    if(req.query.fromdate !== 'undefined' && req.query.todate !== 'undefined')
    {
        var startDate = new Date(req.query.fromdate + " 00:00:00");
        var endDate = new Date(req.query.todate + " 00:00:00");
        dataBooking = await Booking.findAll({
            where: 
            {
                timeOfBooking: 
                {
                    [Op.between]: [startDate,endDate]
                }
            }
        });
    }
    else
        dataBooking = await Booking.findAll();
    
    const showtime = await showTime.findAll();
    const movie = await Movies.findAll();
    let arrShow = [];
    if(dataBooking) {
        dataBooking.forEach(item => {
            let count = 0;
            count += 1;
            if(arrShow.filter(u => u.idShow === item.idShow).length > 0)
            {
                arrShow.forEach(items => {
                    if(items.idShow === item.idShow)
                    {
                        items.countTicket += 1;
                        items.totalPrice += item.totalPrice;
                        return;
                    }
                })
            }
            else
            {
                var obj = {
                    idShow: item.idShow,
                    totalPrice: item.totalPrice,
                    countTicket: count,
                }
                arrShow.push(obj);
            }
        })
    
        let arrData = [];
        let nameMovie, idMovie;
        for(let i = 0; i < arrShow.length; i++) {
            showtime.forEach(item => {
                if(arrShow[i].idShow === item.idShowtime)
                {
                    idMovie = item.idMovies;
                    return;
                }
            })

            movie.forEach(item => {
                if(idMovie === item.movieId)
                {
                    nameMovie = item.movieName;
                }
            })
        
            if(arrData.filter(u => u.idMovie === idMovie).length > 0)
            {
                arrData.forEach(item => {
                    if(item.idMovie === idMovie)
                    {
                        item.countTicket += arrShow[i].countTicket;
                        item.totalPrice += arrShow[i].totalPrice;
                        return;
                    }
                })
           

            }
            else {
                var option = {
                    countTicket: arrShow[i].countTicket,
                    totalPrice: arrShow[i].totalPrice,
                    nameMovie: nameMovie,
                    idMovie: idMovie,
                }
            
                arrData.push(option);
            }
           
        }
        
        res.json(arrData);
    }
    else {
        dataBooking.forEach(item => {
            let count = 0;
            count += 1;
            if(arrShow.filter(u => u.idShow === item.idShow).length > 0)
            {
                arrShow.forEach(items => {
                    if(items.idShow === item.idShow)
                    {
                        items.countTicket += 1;
                        items.totalPrice += item.totalPrice;
                        return;
                    }
                })
            }
            else
            {
                var obj = {
                    idShow: item.idShow,
                    totalPrice: item.totalPrice,
                    countTicket: count,
                }
                arrShow.push(obj);
            }
        })
    
        console.log(arrShow);
        let arrData = [];
        for(let i = 0; i < arrShow.length; i++) {
            showtime.forEach(item => {
                if(arrShow[i].idShow === item.idShowtime)
                {
                    cinemas = item.idMovies;
                    return;
                }
            })
        
            movie.forEach(item => {
                if(cinemas === item.movieId)
                {
                    nameMovie = item.nameMovie;
                }
            })
        
            if(arrData.filter(u => u.idMovie === idMovie).length > 0)
            {
                arrData.forEach(item => {
                    if(item.idMovie === idMovie)
                    {
                        item.countTicket += arrShow[i].countTicket;
                        item.totalPrice += arrShow[i].totalPrice;
                        return;
                    }
                })
            }
            else {
                var option = {
                    countTicket: arrShow[i].countTicket,
                    totalPrice: arrShow[i].totalPrice,
                    nameMovie: nameMovie,
                    idMovie: idMovie,
                }
            
                arrData.push(option);
            }
        }
        
        res.json(arrData);
    }
  
}));

module.exports = router;