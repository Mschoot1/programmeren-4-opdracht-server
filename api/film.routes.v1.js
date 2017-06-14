var express = require('express');
var routes = express.Router();
var db = require('../config/db');

// api/v1/films?offset=:start&count=:number
routes.get('/films', function(req, res) {
    var offset = req.query.offset;
    var count = req.query.count;

    var query = 'SELECT * FROM `1082`.film LIMIT ' + count + ' OFFSET ' + offset;

    console.log('Waarde van ' + '\n' +
        'offset: ' + offset + '\n' +
        'count: ' + count);
    console.log(query);

    res.contentType('application/json');
    db.query(query, function(error, rows) {
        if(error) {
            res.status(400).json(error);
        } else {
            res.status(200).json({ result: rows })
        }
    })
});

routes.get('/films/:id', function(req, res) {
    var film_id = req.params.id;

    var queryGetFilmId = 'SELECT * FROM `1082`.film WHERE film_id=?';

    console.log(queryGetFilmId);

    db.query(queryGetFilmId, film_id, function(error, rows) {
        if(error) {
            res.status(400).json(error);
        } else {
            res.status(200).json({ result: rows })
        }
    })
});

module.exports = routes;