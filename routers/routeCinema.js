const express = require('express');
const router  = express.Router();

const cinemaController = require('../controllers/cinemaController');

router.post('/new-area', cinemaController.newArea);
router.post('/new-cinema', cinemaController.newCinema);
router.get('/all-area', cinemaController.getAllDistrict);
router.get('/all-cinemas', cinemaController.getAllCinema);
router.get('/all-district', cinemaController.getAllArea);


module.exports = router;