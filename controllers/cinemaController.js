const Districts = require('../models/dataDistrict');
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
}

module.exports = new CinemaController