const Accounts = require('../models/dataAccount');
const ImageUsers = require('../models/dataImageUser');
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
    async getInfoUser (req, res) {
        const { refreshToken } = req.query;

        const data = await Accounts.findOne({
            where: {
                refreshToken: refreshToken,
            },
            attributes: ['idUser', 'email', 'fullname', 'role', 'avartar'],
        })

        res.json({status: 200, data})
    }

    
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
            numberphone: data.numberphone,
            active: '', //activeCode
            surplus: 0
        });

        const getIdUser = await Accounts.findOne({
            where: {
                email: data.email,
            }
        })
        var now = new Date();
        NewNotification.create({
            message: `Chào mừng <span>${data.fullname}</span> đến với CGV Việt Nam! Bầy giờ bạn có thể đặt vé xem phim trực tiếp trên web <3`,
            messageType: 'Wellcome',
            image: '',
            time: now,
            status: 0,
            noti_idUser: getIdUser.idUser,
        });

        // var link = `http://localhost:5000/auth/active/${activeCode}`;
        // var pathEmail = data.email.substring(0, data.email.indexOf('@'));
        // await emailSend.send(data.email, 'CGV Việt Nam | Xác Nhận Tài Khoản', link, data.fullname, pathEmail);
        
        res.json({ status: 200 });
    }

    async loginAccount (req, res) {
        const data = req.body;

        const found = await Accounts.findOne({
            where: {
                email: data.email,
            }
        });
        if(!found) {
            res.json({ status: 'error', message: 'Email không tồn tại hoặc chưa được đăng ký!'});
        } else if (found && bcrypt.compareSync(data.password, found.password)) {
            if(found.active === '') {
                const user = {
                    id: found.idUser,
                    email: found.email,
                    fullname: found.fullname,
                    role: found.role,
                }

                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '40s' });
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });

                found.refreshToken = refreshToken;    
                await found.save();

                res.json({ status: 200, accessToken: accessToken, refreshToken: refreshToken, user});
            }
            else {
                res.json({ status: 'error', message: 'Email chưa được kích hoạt vui lòng kiểm tra email!'});
            }
        }
        else {
            res.json({ status: 'error', message: 'Mật khẩu bị sai!'});
        }
    }

    async refreshToken (req, res) {
        const { refreshToken } = req.body;

        if(!refreshToken) return res.sendStatus(401);

        const isuser = await Accounts.findOne({
            where: {
                refreshToken: refreshToken,
            }
        });

        if(!isuser) res.sendStatus(403); 
        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
           
            const user = {
                id: isuser.idUser,
                email: isuser.email,
                fullname: isuser.fullname,
                role: isuser.role,
            }
            
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '40s' });
            const _refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });

            isuser.refreshToken = _refreshToken;
            await isuser.save();
            
            res.json({status: 200, accessToken: accessToken, refreshToken: _refreshToken});
            
        } catch (error) {
            console.log(error);
            return res.sendStatus(401);
        }
    }
}

module.exports = new AuthController