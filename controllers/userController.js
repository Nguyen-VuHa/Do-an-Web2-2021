
const NewNotification = require('../models/dataNotification');
const Accounts = require('../models/dataAccount');
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
}


module.exports = new UserController