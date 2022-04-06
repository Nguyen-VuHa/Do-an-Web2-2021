const Cinemas = require("../models/dataCinema");
const Films = require("../models/dataMovie");
const MovieShowTimes = require("../models/dataShowtimes");
const { Op } = require('sequelize');

class ShowTimesController {  
    async getAllShowtimes (req, res) {

        const data = await MovieShowTimes.findAll({
            include: [
                {
                    model: Films,
                    attributes: ['movieName'],
                },
                {
                    model: Cinemas,
                    attributes: ['nameCinema'],
                }
            ],
            attributes: ['premiereDate', 'showTime', 'fare'],
            order: [
                ['createdAt', 'DESC'],
            ],
        });
        
        res.json({ status: 200, data: data });
    }

    async createNewShowTimes (req, res) {
        const data = req.body;

        try {
            await MovieShowTimes.create({
                premiereDate: data.premiereDate,
                showTime: data.showTime,
                fare: data.fare,
                showTime_idCinema: data.idCinema,
                showTime_idMovie: data.idMovie,
            });
            
            res.json({ status: 200 });
        }
        catch(err) {
            console.log(err);
            res.json({ status: 400, message: 'Create Movie Showtime Failed!' });
        }
    }

    async getShowtimesByMovie (req, res) { 
        const params = req.params.movieId;

        try {
            let data = await Cinemas.findAll({
                include: [
                    {
                        model: MovieShowTimes,
                        include:  {
                            model: Films,
                            where: {
                                movieId: params,
                            },
                            attributes: ['movieId','movieName']
                        },
                        where: {
                            showTime_idCinema: {
                                [Op.not]: null,
                            },
                            premiereDate: {
                                [Op.gte]: new Date(),
                            }
                        }
                    },
                ],
                attributes: [ "id", "nameCinema" ]
            })
    
            res.json({ status: 200, data: data})
        }
        catch (err) {
            res.json({ status: 400, error: err});
        }
        
    }

    async getShowtimesByCinema (req, res) {  
        const params = req.params.cinemaId;

        try { 
            let data = await Films.findAll({
                include: [
                    {
                        model: MovieShowTimes,
                        include:  {
                            model: Cinemas,
                            where: {
                                id: params,
                            },
                            attributes: ['id','nameCinema']
                        },
                        where: {
                            showTime_idCinema: {
                                [Op.not]: null,
                            },
                            premiereDate: {
                                [Op.gte]: new Date(),
                            }
                        }
                    },
                ],
                attributes: [ "movieName", "poster1" ]
            })
    
            res.json({ status: 200, data: data})
        }
        catch (err) {
            res.json({ status: 400, message: 'ID_CINEMA_INVALED!'});
        }
    }
}

module.exports = new ShowTimesController