
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
}


module.exports = new UserController