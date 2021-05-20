const express = require('express');
const UserAccount = require('../models/useraccount');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const router = express.Router();


var error = null;
var message = "";

router.use(function(req, res, next){
    res.locals.title = 'Trang Chủ';
    next();
});

router.get('/', function(req, res){
    res.render('home', { error , message });
    error = null;
});

router.get('/active/:code',asyncHandler(async function(req, res) {
    const value = await UserAccount.findByCode(req.params.code);
    if(value) {
        value.active = null;
        await value.save();
        res.redirect('/');
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
        message = 'Email này chưa được đăng ký!';
        res.redirect('/');
    }
    else if (found && bcrypt.compareSync(password, found.password))
    {
        if(found.active === ""){
            error = true;
            message = 'Đăng nhập thành công!';
            req.session.userId = found.code;
            res.redirect('/');
        }
        else
        {
            error = false;
            message = 'Bạn Chưa Xác Nhận Tài Khoản!';
            res.redirect('/');
        }
    }
    else {
        error = false;
        message = 'Sai Tài Khoản Hoặc Mật Khẩu!';
        res.redirect('/');
    }
}));




module.exports = router;
