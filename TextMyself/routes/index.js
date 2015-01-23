var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
    res.render('index', {
        secret: req.query.text
    });
});

module.exports = router;
