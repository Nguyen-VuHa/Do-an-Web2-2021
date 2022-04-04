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

        await MovieShowTimes.create({
            premiereDate: data.premiereDate,
            showTime: data.showTime,
            fare: data.fare,
            showTime_idCinema: data.idCinema,
            showTime_idMovie: data.idMovie,
        });
        
        res.json({ status: 200 });
    }

    async getShowtimesByMovie (req, res) { 
        const params = req.params.movieId;

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
                        }
                    }
                },
            ],
            attributes: [ "id", "nameCinema" ]
        })

        res.json({ status: 200, data: data})
    }
}

module.exports = new ShowTimesController