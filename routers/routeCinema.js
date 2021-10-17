const express = require('express');
const router  = express.Router();

const cinemaController = require('../controllers/cinemaController');

router.post('/new-area', cinemaController.newArea);
router.get('/all-area', cinemaController.getAllDistrict);
router.get('/all-district', cinemaController.getAllArea);


module.exports = router;