const express = require('express');
const router = express.Router();
const UserAccount = require('../models/useraccount');
const Notification = require('../models/notification');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const emailSend = require('../sendmail');
// var pathLink = process.env.HTTPS_SERVER + `/active/${codeUser}` 
var title_toast , message, type, error;


router.use(function(req, res, next){
    res.locals.title = 'Đăng Ký Thành Viên';
    next();
});

router.get('/', function(req, res) {
    res.render('signuplogin', { title_toast, message, type, error });
    title_toast = message = type = error = '';
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
        error = `reg-false`;
        title_toast = "Warning!";
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
            active: codeUser,
            surplus: 0
        });
        let today = new Date();

        Notification.create({
            idUser: codeUser,
            message: '',
            messbold: fullname,
            linkimg: `http://localhost:3000/prof/image/${codeUser}`,
            time: today,
            status: 0,
            type: 'wellcome',
        });
        error = `reg-true`;
        title_toast = "Sucessfully!";
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