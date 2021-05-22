const express = require('express');
const UserAccount = require('../models/useraccount');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const router = express.Router();

var title_toast , message, type, error;

router.use(function(req, res, next){
    res.locals.title = 'Trang Chủ';
    next();
});

router.get('/', function(req, res){
    res.render('home', { title_toast , message, type, error });
    title_toast = message = type = error =  '';
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
        if(found.active === null){
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


module.exports = router;
