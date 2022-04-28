const express = require('express');
const router  = express.Router();

const ShowTimesController = require('../controllers/showTimeContronller');

router.get('/all-showtimes', ShowTimesController.getAllShowtimes);
router.get('/showtimes-by-movie/:movieId', ShowTimesController.getShowtimesByMovie);
router.get('/showtimes-by-cinema/:cinemaId', ShowTimesController.getShowtimesByCinema);
router.get('/showtimes/:showtimeId', ShowTimesController.getShowtimeById);


router.post('/showtimes/create', ShowTimesController.createNewShowTimes);



module.exports = router;