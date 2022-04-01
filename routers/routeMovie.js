const express = require('express');
const router  = express.Router();

const movieController = require('../controllers/movieController');

router.post('/new-movie', movieController.newMovie);
router.post('/movie/:movieId/update', movieController.updateMovieById);
router.get('/movie', movieController.getAllMovie);
router.get('/movie-page', movieController.getMoviePagination);
// API movie client view getMovieDetailById
router.get('/movie/movie-detail/:movieId', movieController.getMovieDetailById);

//api Homepage
router.get('/aG9tZXBhZ2U=/c4c60e3e-2d35-46b6-94ce-66a9d16121fe', movieController.getMovieWithHomePage);
router.get('/movie-poster/:movieId/update', movieController.getMoviePosterById);
router.get('/movie-data/:movieId/update', movieController.getMovieDataById);
// api Movie Detail
router.get('/bW92aWU=/bec4a217-4bfb-4da6-b396-659e9949de62', movieController.getMovieDetail);
router.get('/movie/movie-current', movieController.getMovieShowCurrent);




module.exports = router;