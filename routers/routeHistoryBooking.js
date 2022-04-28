const express = require('express');
const router  = express.Router();

const HistoryBookingController = require('../controllers/HistoryBookingController');

router.post('/history-booking/create', HistoryBookingController.createNewHistoryBooking);
router.post('/history-ticket/create', HistoryBookingController.createNewHistoryTicket);

module.exports = router;