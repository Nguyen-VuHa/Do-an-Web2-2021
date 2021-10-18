const Districts = require('../models/dataDistrict');
const Cinemas = require('../models/dataCinema');
const local = require('../local.json');

class CinemaController { 

    async getAllDistrict (req, res) { 
        res.json({status: 200, district: local});
    }

    async newArea (req, res) { 
        const data = req.body;
        const checkArea = await Districts.findByPk(data.id);

        if(checkArea) return res.json({status: 'error', message: 'Khu vực đã tồn tại!'});

        Districts.create({
            id: data.id,
            district: data.district
        })
        res.json({ status: 200 });
    }

    async getAllArea (req, res) { 
        const data = await Districts.findAll();
     
        res.json({ status: 200, data: data});
    }

    async newCinema (req, res) {
        const data = req.body;
        const checkCinema = await Cinemas.findOne({
            where: {
                city: data.city,
                district: data.district,
            }
        })

        if(checkCinema) return res.json({ status: 'error', message: 'Địa điểm này có rồi! có bị mù không!' });

        try {
            if(data.idArea) {
                Cinemas.create({
                    nameCinema: data.nameCinema,
                    typeCinema: data.typeCinema,
                    city: data.city,
                    district: data.district,
                    wards: data.wards,
                    horizontalSize: parseInt(data.horizontalSize) ? parseInt(data.horizontalSize) : 0,
                    verticalSize: parseInt(data.verticalSize) ? parseInt(data.verticalSize) : 0,
                    pointLat: data.pointLat,
                    pointLng: data.pointLng,
                    C_idArea: data.idArea,
                });
    
                res.json({ status: 200 });
            }
            else 
                res.json({ status: 'error', message: 'Not đủ thông tin mà thêm!' });
        }
        catch (error) {
            res.json({ status: 'error', message: 'Not đủ thông tin mà thêm!' });
        }
    }

    async getAllCinema (req, res) {
        const data = await Cinemas.findAll();
        
        res.json({ status: 200, data})
    }
}

module.exports = new CinemaController