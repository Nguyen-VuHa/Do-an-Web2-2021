
const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
    res.render('page404');
});

module.exports = router;
