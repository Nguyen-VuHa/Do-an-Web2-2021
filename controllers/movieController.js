const Films = require('../models/dataMovie');
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

    async getMoviePagination (req, res) {
        let { s, page, size } = req.query;
        if(!page) page = 1;
        if(!size) size = 8;

        const limit = parseInt(size);
        const skip = (parseInt(page) - 1) * size;

        const allMovie = await Films.findAll();

        const paginationMovie = await Films.findAll({
            where: {
                movieName: {
                    [Op.like]: `%${s ? s : ''}%`
                }
            },
            limit: limit,
            offset: skip,
        });

        res.json({ status: 200, totalMovie: allMovie.length, 
            totalPages: Math.ceil((s ? paginationMovie.length : allMovie.length)  / limit), 
            currentPage: page ? + page : 0,
            data: paginationMovie });
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
            where: {
                premiereDate: {
                    [Op.lte] : Date.now()
                },
                endDate: {
                    [Op.gt]: Date.now()
                }
            },
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

    async getMovieShowCurrent (req, res) {
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
        });

        res.json({status: 200, data: movieCurrent});
    }

    async getMovieDetail (req, res) {
        
        const movieCurrent = await Films.findAll({
            where: {
                premiereDate: {
                    [Op.lte] : Date.now()
                },
                endDate: {
                    [Op.gt]: Date.now()
                }
            },
        })

        const movieComing = await Films.findAll({
            where: {
                premiereDate: {
                    [Op.gt] : Date.now()
                }
            },
        })

        res.json({status: 200, data: {
            movieCurrent,
            movieComing,
        }});
    }

    // Get Movie Client View
    async getMovieDetailById (req, res) {
        const movieId = req.params.movieId;

        const regexUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if(regexUuid.test(movieId)) {
            const movieData = await Films.findOne({
                where: {
                    movieId: movieId
                },
            });

            res.status(200).json({data: movieData});
        }
        else
            res.status(400).json({message: 'Can\'t not find movie in database!'});

    }       


}

module.exports = new MovieController