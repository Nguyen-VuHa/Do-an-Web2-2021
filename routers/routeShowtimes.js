const express = require('express');
const router  = express.Router();

const ShowTimesController = require('../controllers/showTimeContronller');

router.get('/all-showtimes', ShowTimesController.getAllShowtimes);

router.post('/showtimes/create', ShowTimesController.createNewShowTimes);


module.exports = router;