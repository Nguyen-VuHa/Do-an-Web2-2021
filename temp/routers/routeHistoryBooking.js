const express = require('express');
const router  = express.Router();

const HistoryBookingController = require('../controllers/historyBookingController');

router.post('/history-booking/create', HistoryBookingController.createNewHistoryBooking);
router.post('/history-ticket/create', HistoryBookingController.createNewHistoryTicket);
router.post('/send-mail-booking', HistoryBookingController.sendMail);

module.exports = router;