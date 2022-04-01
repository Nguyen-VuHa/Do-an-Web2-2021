const Cinemas = require("../models/dataCinema");
const Films = require("../models/dataMovie");
const MovieShowTimes = require("../models/dataShowtimes");


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

}

module.exports = new ShowTimesController