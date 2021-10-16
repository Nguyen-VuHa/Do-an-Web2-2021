const express = require('express');
const router  = express.Router();

const movieController = require('../controllers/movieController');

router.post('/new-movie', movieController.newMovie);
router.get('/movie', movieController.getAllMovie);

module.exports = router;