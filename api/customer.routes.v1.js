var express = require('express');
var routes = express.Router();
var db = require('../config/db');

routes.get('/rentals/customer/:customer_id', function (req, res) {
    var customer_id = req.params.customer_id;
    res.contentType('application/json');
    db.query('SELECT * FROM rental WHERE customer_id = ? LIMIT 10;', [customer_id], function (error, rows) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({result: rows});
        }
    });
});

module.exports = routes;