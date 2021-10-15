const Accounts = require('../models/dataAccount');
const NewNotification = require('../models/dataNotification');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailSend = require('../sendmail');

function randoomActiveCode(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
   
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
   
    return text;
}

class AuthController { 

    // POST auth/register 
    async newAccount (req, res) {
        const data = req.body;
        const found = await Accounts.findOne({
            where: {
                email: data.email,
            }
        });

        if(found) return res.json({ status: 'error', message: 'Your email already exists!'});
        
        var hash = bcrypt.hashSync(data.password, 10);
        var activeCode = randoomActiveCode(8);
        await Accounts.create({
            email: data.email,
            password: hash,
            fullname: data.fullname,
            role: 1,
            avartar: '',
            numberphone: data.numberphone,
            active: activeCode,
            surplus: 0
        });

        const getIdUser = await Accounts.findOne({
            where: {
                email: data.email,
            }
        })
        var now = new Date();
        NewNotification.create({
            message: 'Wellcome to application Movie Booking!',
            messageType: 'Wellcome',
            image: '',
            time: now,
            status: 0,
            noti_idUser: getIdUser.idUser,
        });

        var link = `http://localhost:5000/auth/active/${activeCode}`;
        var pathEmail = data.email.substring(0, data.email.indexOf('@'));
        await emailSend.send(data.email, 'CGV Việt Nam | Xác Nhận Tài Khoản', link, data.fullname, pathEmail);
        
        res.json({ status: 200 });
    }

    async getAccount (req, res) {
        const sss = await Accounts.findAll();
        
        res.json({ status: 200, sss});
    }

}

module.exports = new AuthController