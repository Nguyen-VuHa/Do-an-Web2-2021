const express = require('express');
const Theaters = require('../models/theater');
const asyncHandler = require('express-async-handler');
const router = express.Router();

router.use(function(req, res, next){
    res.locals.title = `${req.query.name}`;
    next();
});

router.get('/',asyncHandler(async function(req, res) {
    if(req.query.id !== undefined)
    {
        const data = await Theaters.findById(req.query.id);
        if(data)
            res.render('cinemaView', { data });
        else
            res.render('page404');
    }
    else {
        res.render('page404');
    }

}));

module.exports = router;