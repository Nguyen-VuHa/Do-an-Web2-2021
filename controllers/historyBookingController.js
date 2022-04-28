const HistoryBooking = require('../models/dataHistoryBooking');
const HistoryTicket = require('../models/dataHistoryTicket');
const Accounts = require('../models/dataAccount');
const NewNotification = require('../models/dataNotification');

class HistoryBookingController { 

    async createNewHistoryBooking (req, res) { 
        const reqData = req.body;

        try {
            await HistoryBooking.create({
                bookingTime: reqData.bookingTime,
                unitPrice: reqData.unitPrice,
                totalPrice: reqData.totalPrice,
                HB_idUser: reqData.idUser,
                ST_idShowtime: reqData.idShowtime,
            })
            .then(async (data) => {
                res.json({status: 200, id: data.id});
                
                await Accounts.findByPk(reqData.idUser)
                .then(user => {
                    Accounts.update({
                        surplus: user.surplus - reqData.totalPrice,
                    },{
                        where: {
                            idUser: reqData.idUser,
                        }
                    });

                    NewNotification.create({
                        message: `Đặt vé xem phim thành công! Bạn có thể vào lịch sử giao dịch để kiểm tra Xin cảm ơn <3!`,
                        messageType: 'Wellcome',
                        image: user.avartar,
                        time: new Date(),
                        status: 0,
                        noti_idUser: reqData.idUser,
                    })
                })
                .catch(() => {
                    res.status(400).json({message: 'FIND BY USER IS NOT DEFENIED!'});
                }) 
            })
            .catch(() => {
                res.status(400).json({ message: 'error' });
            })
        }
        catch(err) {
            res.status(400).json({ message: 'error' });
        }
    }

    async createNewHistoryTicket (req, res) { 
        const reqData = req.body;

        try {
            if(reqData) {
                const { listSeat, idBooking } = reqData;
    
                listSeat.forEach(s => {
                    HistoryTicket.create({
                        seatsCode: s,
                        HT_HB_idBooking: idBooking,
                    })
                });
    
                res.status(200).json({status: 200});
            }
        }
        catch(err) {
            res.status(400).json({message: 'CREATED HISTORY TICKET FAILED'});
        }
        
    }
}

module.exports = new HistoryBookingController