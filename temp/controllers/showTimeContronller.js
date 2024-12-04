const Cinemas = require("../models/dataCinema");
const Films = require("../models/dataMovie");
const MovieShowTimes = require("../models/dataShowtimes");
const HistoryBooking = require("../models/dataHistoryBooking");
const HistoryTicket = require("../models/dataHistoryTicket");
const { Op } = require('sequelize');

class ShowTimesController {  
    async getAllShowtimes (req, res) {
        try {
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
        catch(err) {
            res.status(400).json({ status: 'ERROR', message: err });
        }
        
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
            res.status(400).json({ status: 400, message: 'Create Movie Showtime Failed!' });
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
            res.status(400).json({ status: 400, error: err});
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
            
            if(!data) res.json({ status: 200, message: 'ID CINEMA INVALED!'})

            res.json({ status: 200, data: data})
        }
        catch (err) {
            res.status(400).json({ status: 400, message: 'ID CINEMA INVALED!'});
        }
    }

    async getShowtimeById(req, res) {   
        const params = req.params.showtimeId;

        try {
            console.log(params);
            await MovieShowTimes.findOne({
                where: {
                    idShowtime: params
                },
                include:  {
                    model: HistoryBooking,
                    attributes: ['id'],
                    include: {
                        model: HistoryTicket,
                        attributes: ['seatsCode']
                    }
                },
            })
            .then(data => {
                res.json({ status: 200, data: data})
            })
            .catch(() => {
                res.json({ status: 200, message: 'SHOWTIME ID INVALED!'})
            })
        }
        catch(err) {

        }
       
    }
}

module.exports = new ShowTimesController