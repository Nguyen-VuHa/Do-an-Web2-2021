const express = require('express');
const router = express.Router();
const UserAccount = require('../models/useraccount');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const emailSend = require('../sendmail');
// var pathLink = process.env.HTTPS_SERVER + `/active/${codeUser}` 
var title , message, type, error;


router.use(function(req, res, next){
    res.locals.title = 'Đăng Ký Thành Viên';
    next();
});

router.get('/', function(req, res) {
    res.render('signuplogin', { title, message, type, error });
    title = message = type = error ='';
});

router.post('/dang-ky',asyncHandler(async function(req, res) {
    const { fullname, email, password, numberphone} = req.body;
    const found = await UserAccount.findByEmail(email);
    const codeUser = randoomCode(7);
    var namePathEmail = email.substring(0, email.indexOf('@'));
    if(await UserAccount.findByCode(codeUser))
    {
        codeUser = randoomCode(7);
    }
   
    var link = `http://localhost:3000/active/${codeUser}`;
    if(found) {
        error = false;
        title = "Warning!";
        message = 'Email này đã được đăng ký!';
        type = "warning";
        res.redirect('/reg');
    }
    else {
        var hash = bcrypt.hashSync(password, 10);
        UserAccount.create({
            code: codeUser,
            email: email,
            password: hash,
            fullname: fullname,
            role: 1,
            numberphone: numberphone,
            active: codeUser
        });
        error = true;
        title = "Sucessfully!";
        message = 'Đã đăng ký thành công tài khoản CGV.';
        type = "success";
        await emailSend.send(email, 'CGV Việt Nam | Xác Nhận Tài Khoản', link, fullname, namePathEmail);
        res.redirect('/reg');
    }
}));


function randoomCode(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
   
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
   
    return text;
}


module.exports = router;