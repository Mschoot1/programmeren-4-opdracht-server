//
// ./api/film.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var db = require('../config/db');

routes.get('/inventories/:film_id', function(req, res) {
    var film_id = req.params.film_id;

    res.contentType('application/json');
    db.query('SELECT * FROM inventory WHERE film_id = ?', [film_id], function(error, rows) {
        if(error) {
            res.status(400).json(error);
        } else {
            res.status(200).json({ result: rows })
        }
    })
});

module.exports = routes;