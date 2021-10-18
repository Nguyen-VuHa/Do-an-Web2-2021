const Films = require('../models/dataMovie')
const { Op } = require('sequelize');
const db = require('../models/database');
const { cloudinary } = require('../untils/cloudinary');

class MovieController { 
    async newMovie (req, res) { 
        const { poster, dataMovie  } = req.body;

        const checkFilms = await Films.findOne({
            where: {
                movieName: dataMovie.nameMovie,
            }
        });

        if(checkFilms) return res.json({status: 'error', message: 'Phim đã tồn tại trong danh sách!'});
        var poster1 = await cloudinary.uploader.upload(poster.poster1, {
            upload_preset: 'poster_movie',
        });
        
        var poster2 = await cloudinary.uploader.upload(poster.poster2, {
            upload_preset: 'poster_movie',
        });

        var poster3 = await cloudinary.uploader.upload(poster.poster3, {
            upload_preset: 'poster_movie',
        });

        var poster4 = await cloudinary.uploader.upload(poster.poster4, {
            upload_preset: 'poster_movie',
        });

        var startDate = new Date(dataMovie.startdate);
        var endDate = new Date(dataMovie.enddate);

        Films.create({
            movieName: dataMovie.nameMovie,
            time: dataMovie.time,
            premiereDate: startDate,
            endDate: endDate,
            describe: dataMovie.description,
            category: dataMovie.category,
            directors: dataMovie.directors,
            mainActor: dataMovie.mainActor,
            poster1: poster1.secure_url,
            poster2: poster2.secure_url,
            poster3: poster3.secure_url,
            poster4: poster4.secure_url,
            trailer: dataMovie.chanelId,
        });

        res.json({ status: 200 })
    }

    async updateMovieById (req, res) {
        const movieId = req.params.movieId;
        const { poster, dataMovie  } = req.body;
        
        var objectPoster = {
            poster1: '',
            poster2: '',
            poster3: '',
            poster4: '',
        }

        if(poster.poster1.includes('https')) {
            objectPoster = {
                ...objectPoster,
                poster1: poster.poster1,
            }
        }
        else {
            var poster1 = await cloudinary.uploader.upload(poster.poster1, {
                upload_preset: 'poster_movie',
            });
            objectPoster = {
                ...objectPoster,
                poster1: poster1.secure_url,
            }
        }

        if(poster.poster2.includes('https')) {
            objectPoster = {
                ...objectPoster,
                poster2: poster.poster2,
            }
        }
        else {
            var poster2 = await cloudinary.uploader.upload(poster.poster2, {
                upload_preset: 'poster_movie',
            });
            objectPoster = {
                ...objectPoster,
                poster1: poster2.secure_url,
            }
        }

        if(poster.poster3.includes('https')) {
            objectPoster = {
                ...objectPoster,
                poster3: poster.poster3,
            }
        }
        else {
            var poster3 = await cloudinary.uploader.upload(poster.poster3, {
                upload_preset: 'poster_movie',
            });
            objectPoster = {
                ...objectPoster,
                poster3: poster3.secure_url,
            }
        }

        if(poster.poster4.includes('https')) {
            objectPoster = {
                ...objectPoster,
                poster4: poster.poster4,
            }
        }
        else {
            var poster4 = await cloudinary.uploader.upload(poster.poster4, {
                upload_preset: 'poster_movie',
            });
            objectPoster = {
                ...objectPoster,
                poster4: poster4.secure_url,
            }
        }

        Films.update({
            movieName: dataMovie.nameMovie,
            time: dataMovie.time,
            premiereDate: dataMovie.startdate,
            endDate: dataMovie.enddate,
            describe: dataMovie.description,
            category: dataMovie.category,
            directors: dataMovie.directors,
            mainActor: dataMovie.mainActor,
            poster1: objectPoster.poster1,
            poster2: objectPoster.poster2,
            poster3: objectPoster.poster3,
            poster4: objectPoster.poster4,
            trailer: dataMovie.chanelId,
        },{
            where: {
                movieId: movieId,
            }
        })

        res.json({ status: 200 });
    }

    async getAllMovie (req, res) {
        const data = await Films.findAll();

        res.json({ status: 200, data});
    }

    async getMoviePosterById (req, res) {
        const params = req.params.movieId;
        
        const data = await Films.findByPk(params, {
            attributes: ['poster1', 'poster2', 'poster3', 'poster4',]
        });

        res.json({ status: 200, data});
    }

    async getMovieDataById (req, res) {
        const params = req.params.movieId;
        
        const data = await Films.findByPk(params, {
            attributes: ['movieName', 'time', 'premiereDate', 'endDate', 'describe', 'category', 'directors', 'mainActor', 'trailer']
        });

        res.json({ status: 200, data});
    }

    async getMovieWithHomePage (req, res) {
        
        const movieCurrent = await Films.findAll({
            where: {
                premiereDate: {
                    [Op.lte] : Date.now()
                },
                endDate: {
                    [Op.gt]: Date.now()
                }
            },
            attributes: ['movieId', 'movieName', 'premiereDate', 'endDate' ,'poster1',]
        })

        const movieComing = await Films.findAll({
            where: {
                premiereDate: {
                    [Op.gt] : Date.now()
                }
            },
            attributes: ['movieId', 'movieName', 'premiereDate' ,'poster1',]
        })

        const movieTrending = await Films.findAll({ 
            order: db.random(), 
            limit: 1,
            attributes: ['movieId', 'movieName', 'directors', 'mainActor', 'category', 'describe', 'time' ,'poster1', 'trailer']
        });


        res.json({status: 200, data: {
            movieCurrent,
            movieComing,
            movieTrending
        }});
    }
}

module.exports = new MovieController