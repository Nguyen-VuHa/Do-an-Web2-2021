const express = require('express');
const UserAccount = require('../models/useraccount');
const Movies = require('../models/movies');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const router = express.Router();

var title_toast , message, type, error;

router.use(function(req, res, next){
    res.locals.title = 'Trang Chủ';
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
        if( someday.getTime() >= getDate.getTime())
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
        else {
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
    if(userId === undefined)
    {
        res.render('home', { title_toast , message, type, error, list_film_cmc, list_film_hdc });
        title_toast = message = type = error =  '';
    }
    else {
        const dataId = await UserAccount.findByCode(userId);
        res.render('home', { dataId, list_film_cmc, list_film_hdc });
    }
}));

router.get('/active/:code',asyncHandler(async function(req, res) {
    const { code } = req.params.code;
    const value = await UserAccount.findByCode(code);
    if(value) {
        if(value.active === null)
        {
            res.redirect('/');
        }
        else
        {
            try{
                value.active = null;
                await value.save();
                error = true;
                title_toast = "Successfully!";
                message = 'Đã xác minh thành công! Xin mời đăng nhập.';
                type = "success";
                res.redirect('/');
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


router.post('/login',asyncHandler(async function(req, res){
    const { email, password } = req.body;
    const found = await UserAccount.findByEmail(email);
    if(!found)
    {
        error = false;
        title_toast = "Warning!";
        message = 'Email này chưa được đăng ký!';
        type = "warning";
        res.redirect('/');
    }
    else if (found && bcrypt.compareSync(password, found.password))
    {
        //null
        if(found.active === ''){
            error = true;
            title_toast = "CGV Cinemas!";
            message = 'Welcome to CGV Cinema.';
            type = "info";
            req.session.userId = found.code;
            res.redirect('/');
        }
        else
        {
            error = false;
            title_toast = "Warning!";
            message = 'Bạn chưa xác nhận tài khoản!';
            type = "warning";
            res.redirect('/');
        }
    }
    else {
        error = false;
        title_toast = "Warning!";
        message = 'Sai tài khoản hoặc mật khẩu!';
        type = "warning";
        res.redirect('/');
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
    var obDataHeader = {};
    var obDataPoster = {};
    obDataHeader = {
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
    obDataPoster = {
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


module.exports = router;
