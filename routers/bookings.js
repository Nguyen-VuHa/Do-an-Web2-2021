const express = require('express');
const asyncHandler = require('express-async-handler');
const ensureLoggedIn = require('../middlewares/ensure_logged_in');
const router = express.Router();

router.use(ensureLoggedIn);

router.use(function(req, res, next){
    res.locals.title = 'Booking Movies';
    next();
});

router.get('/', function(req, res) {
    res.render('bookings');
});

module.exports = router;