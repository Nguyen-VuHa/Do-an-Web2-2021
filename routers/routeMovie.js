const express = require('express');
const router  = express.Router();

const movieController = require('../controllers/movieController');

router.post('/new-movie', movieController.newMovie);
router.post('/movie/:movieId/update', movieController.updateMovieById);
router.get('/movie', movieController.getAllMovie);
router.get('/movie-page', movieController.getMoviePagination);
//api Homepage
router.get('/aG9tZXBhZ2U=/c4c60e3e-2d35-46b6-94ce-66a9d16121fe', movieController.getMovieWithHomePage);
router.get('/movie-poster/:movieId/update', movieController.getMoviePosterById);
router.get('/movie-data/:movieId/update', movieController.getMovieDataById);

module.exports = router;