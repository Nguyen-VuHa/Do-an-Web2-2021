const express = require('express');
const router  = express.Router();

const movieController = require('../controllers/movieController');

router.post('/new-movie', movieController.newMovie);
router.post('/movie/:movieId/update', movieController.updateMovieById);
router.get('/movie', movieController.getAllMovie);
router.get('/movie-poster/:movieId/update', movieController.getMoviePosterById);
router.get('/movie-data/:movieId/update', movieController.getMovieDataById);

module.exports = router;