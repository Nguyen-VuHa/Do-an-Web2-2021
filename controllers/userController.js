
const NewNotification = require('../models/dataNotification');
const Accounts = require('../models/dataAccount');
const ImageUsers = require('../models/dataImageUser');
const { cloudinary } = require('../untils/cloudinary');

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
        
        res.json({status: 200, data: dataUser });
    }

    async updateProfile (req, res) { 
        const dataProfile = req.body;
        const idUser = req.userId;

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
        const objdata = req.body;

        Accounts.update({
            avartar:  objdata.data.imgUrl
        }, {
            where: {
                idUser: userId,
            }
        });

        res.json({status: 200});
    }
}


module.exports = new UserController