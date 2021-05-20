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
                message = "Đã Active! Xin đăng nhập lại.";
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
        message = 'Email này chưa được đăng ký!';
        res.redirect('/');
    }
    else if (found && bcrypt.compareSync(password, found.password))
    {
        if(found.active === null){
            error = true;
            message = 'Đăng nhập thành công!';
            req.session.userId = found.code;
            res.redirect('/');
        }
        else
        {
            error = false;
            message = 'Bạn chưa xác nhận tài khoản!';
            res.redirect('/');
        }
    }
    else {
        error = false;
        message = 'Sai tài khoản hoặc mật khẩu!';
        res.redirect('/');
    }
}));




module.exports = router;
