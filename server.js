//
// server.js
//
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var auth_routes_v1 = require('./api/authentication.routes.v1');
var film_routes_v1 = require('./api/film.routes.v1');
var inventory_routes_v1 = require('./api/inventory.routes.v1');
var rental_routes_v1 = require('./api/rental.routes.v1');
var config = require('./config/config');
var expressJWT = require('express-jwt');

var app = express();

app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

app.use(expressJWT({
    secret: config.secretKey
}).unless({
    path: [
        {url: '/api/v1/login', methods: ['POST']},
        {url: '/api/v1/register', methods: ['POST']},
        {url: /\/films\/*/, methods: ['GET']}
    ]
}));

app.set('port', (process.env.PORT || config.webPort));
app.set('env', 'development');

app.use(logger('dev'));

app.use('/api/v1', auth_routes_v1);
app.use('/api/v1', film_routes_v1);
app.use('/api/v1', inventory_routes_v1);
app.use('/api/v1', rental_routes_v1);

app.use(function (err, req, res, next) {
    const error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    };
    res.status(401).send(error);
});

// Fallback
app.use('*', function (req, res) {
    res.status(400);
    res.json({
        'error': 'Deze URL is niet beschikbaar.'
    });
});

// start de server.
app.listen(app.get('port'), function () {
    console.log('De server luistert op port ' + app.get('port'));
});

module.exports = app;