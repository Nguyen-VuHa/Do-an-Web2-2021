const HistoryBooking = require('../models/dataHistoryBooking');
const HistoryTicket = require('../models/dataHistoryTicket');
const Accounts = require('../models/dataAccount');
const NewNotification = require('../models/dataNotification');

const nodemailer = require('../sendmail');


class HistoryBookingController { 
    async sendMail (req, res) {
        const data = req.body;

        let objData = {
            fullName: data?.fullName,
            movieName: data?.movieName,
            urlQRCode: 'https://bhdstar-vn.herokuapp.com/',
            idBooking: data?.idBooking,
            cinema: data?.cinema,
            address: data?.address,
            bookingTime: data?.bookingTime,
            paymentAmount: data?.paymentAmount && data.paymentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            showtime:  data?.showtime,
            listSeats: data?.listSeats,
        }

        try {
            await nodemailer.sendBookingMailTrap(data?.email, objData);
            res.status(200).json({status: 200, message: 'success'});
        }
        catch (err) {
            res.status(400).json({ status: 400, message: 'Send Mail Failed!'})
        }
    }

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
                .then(async (user) => {
                    Accounts.update({
                        surplus: user.surplus - reqData.totalPrice,
                    },{
                        where: {
                            idUser: reqData.idUser,
                        }
                    });

                    // NewNotification.create({
                    //     message: `Đặt vé xem phim thành công! Bạn có thể vào lịch sử giao dịch để kiểm tra Xin cảm ơn <3!`,
                    //     messageType: 'Wellcome',
                    //     image: user.avartar,
                    //     time: new Date(),
                    //     status: 0,
                    //     noti_idUser: reqData.idUser,
                    // })
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