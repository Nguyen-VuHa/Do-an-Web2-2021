const Films = require('../models/dataMovie')
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

    async getAllMovie (req, res) {
        const data = await Films.findAll();

        res.json({ status: 200, data});
    }
}

module.exports = new MovieController