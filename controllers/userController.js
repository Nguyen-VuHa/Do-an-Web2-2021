
const NewNotification = require('../models/dataNotification');
const Accounts = require('../models/dataAccount');
const ImageUsers = require('../models/dataImageUser');
const { cloudinary } = require('../untils/cloudinary');
const WalletPersonal = require('../models/dataWalletPersonal');

class UserController {  
    
    async getCountNotification (req, res) {
        const idUser = req.userId;

        const userId = await NewNotification.findAll({
            where: {
                noti_idUser: idUser,
                status: 0,
            }
        });
        const user =  await Accounts.findByPk(idUser);
        
        res.json({ status: 200, count: userId.length, imgLink: user.avartar ? user.avartar : '' });
    }

    async listNotification (req, res) { 
        const idUser = req.userId;

        NewNotification.update({
            status: 1
        },{
            where: {
                noti_idUser: idUser,
            }
        })

        const userNotify = await NewNotification.findAll({
            where: {
                noti_idUser: idUser,
            },
            order: [
                ['time', 'DESC'],
            ]
        });

        res.json({status: 200, notify: userNotify });
    }

    async getInfoUser (req, res) { 
        const idUser = req.userId;

        const dataUser = await Accounts.findByPk(idUser , {
            attributes: ['idUser', 'email', 'fullname', 'numberphone', 'birthday', 'sex', 'address']
        });
        
        if(dataUser && Object.keys(dataUser).length > 0) 
            res.json({status: 200, data: dataUser });
        else+
            res.json({status: 403, message: 'USER INVALED!!!' });
    }

    async updateProfile (req, res) { 
        const dataJson = req.body;
        const idUser = req.userId;

        let decodeData = dataJson.data.split('..');
        let keys = Buffer.from(decodeData[1]).toString('base64');
        let dataProfile = JSON.parse(Buffer.from(decodeData[0].replace(keys, ''), 'base64'));

        await Accounts.update({
            fullname: dataProfile.fullname,
            numberphone: dataProfile.numberphone,
            birthday: dataProfile.birthday,
            sex: dataProfile.sex,
            address: dataProfile.address,
        },{
            where: {
                idUser: idUser
            }
        });
        
        res.json({status: 200});
    }

    async updateImageUser (req, res) {  
        const idUser = req.userId;
        const dataBase64 = req.body;

        if(dataBase64) {
            var image = await cloudinary.uploader.upload(dataBase64.data, {
                upload_preset: 'image_user',
            });
        }

        await ImageUsers.create({
            imgUrl: image.secure_url,
            Img_idUser: idUser,
        })

        res.json({status: 200, imgUrl: image.secure_url});
    }

    async getAllImageUser (req, res) {  
        const idUser = req.userId;
        
        const dataImage = await ImageUsers.findAll({
            where: {
                Img_idUser: idUser,
            },
            attributes: ['id', 'imgUrl', 'createdAt'],
            order:  [
                ['createdAt', 'DESC'],
            ]
        })

        res.json({status: 200, data: dataImage});
    }

    async getAvartarUser (req, res) {
        const idUser = req.userId;
        const findUser = await Accounts.findByPk(idUser);

        res.json({status: 200, data: findUser.avartar ? findUser.avartar : ''});
    }

    async saveAvartarUser (req, res) {
        const userId = req.userId;
        const data = req.body;

        console.log(userId, data);

        Accounts.update({
            avartar:  data?.imgUrl,
        }, {
            where: {
                idUser: userId,
            }
        });

        res.json({status: 200});
    }

    async getWalletPersonal (req, res) {
        const userId = req.userId;

        const wallet = await WalletPersonal.findAll({
            where:{
                toUpCard_idUser: userId,
            },
        });
        
        res.json({ status: 200, data: wallet });
    }

    async createRechargeMoney (req, res) {
        const userId = req.userId;
        const data = req.body;

        let today = new Date();

        await WalletPersonal.create({
            code: data.code,
            seriNumber: data.seriNumber,
            denominations: data.denominations,
            tradingHours: `${today.getHours()}:${today.getMinutes() + 1}`,
            toUpCard_idUser: userId,
        });

        const dataUser = await Accounts.findOne({
            where: {
                idUser: userId,
            }
        });

        await Accounts.update({
            surplus: (data.denominations + dataUser.surplus),
        }, {
            where: {
                idUser: userId,
            }
        })

        var now = new Date();

        await NewNotification.create({
            message: `Chúc mừng <span>${dataUser.fullname}</span> đã nạp thành công số tiền <span>${data.denominations.toLocaleString()} đ</span> vào ví tiền! Vui lòng kiểm tra ví tiền của bạn và xin cảm ơn <3`,
            messageType: 'Wellcome',
            image: dataUser.avartar,
            time: now,
            status: 0,
            noti_idUser: userId,
        });

        res.json({ status: 200 });
    }
}


module.exports = new UserController