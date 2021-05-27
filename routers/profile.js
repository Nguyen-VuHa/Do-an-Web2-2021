const express = require('express');
const ensureLoggedIn = require('../middlewares/ensure_logged_in');
const UserAccount = require('../models/useraccount');
const asyncHandler = require('express-async-handler');
const router = express.Router();

router.use(ensureLoggedIn);

router.use(function(req, res, next){
    res.locals.title = 'Thông Tin Cá Nhân';
    next();
});

router.get('/:id',asyncHandler(async function(req, res) {
    var userId = req.params.id;
    res.render('profile', { userId });
}));

router.post('/photo/:id',asyncHandler(async function(req, res) {
    const datajson = req.body.data;
    const data = await UserAccount.findByCode(req.params.id);
    data.avartar = datajson;
    await data.save();
    res.redirect('/prof/' + `${req.params.id}`);
}));

//API InfoUser
router.get('/api/:id', asyncHandler(async function(req, res){
    const data = await UserAccount.findByCode(req.params.id);
    res.json(data);
}));

router.get('/photo/:id',asyncHandler(async  function(req, res){
    const user = await UserAccount.findByCode(req.params.id);
     if(!user || !user.avartar)
    {
        res.json(null);
    }
    else {
        res.json(user.avartar.toString());
    }
}));


router.post('/api/u/:id', asyncHandler(async function(req, res){
    const data = await UserAccount.findByCode(req.params.id);
    data.fullname = req.body.fullname;
    data.email = req.body.email;
    data.numberphone = req.body.numberphone;
    await data.save();
    res.json(true);
}));

router.get('/api/u/:id', asyncHandler(async function(req, res){ 
    res.send(req.body);
}))


module.exports = router;