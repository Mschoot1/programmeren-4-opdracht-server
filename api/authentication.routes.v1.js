//
// ./api/authentication.routes.v1.js
//
var express = require('express');
var router = express.Router();
var db = require('../config/db.js');
var bCrypt = require('bcryptjs');
var salt = bCrypt.genSaltSync(10);
var auth = require('../auth/authentication');
var config = require('../config/config.json');
var expressJWT = require('express-jwt');

router.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    console.log("email: " + email);
    console.log("password: " + password);

    var _dummy_customer_id = process.env.APP_CUSTOMER_ID;
    var _dummy_email = process.env.APP_EMAIL;
    var _dummy_password = process.env.APP_PASSWORD;

    var UNDEFINED = 'undefined';

    db.query('SELECT email, password, customer_id FROM customer WHERE email = ?', [email], function (error, results) {
        if (error) {
            res.sendStatus(401);
        } else {
            if (results.length > 0) {
                if (bCrypt.compareSync(password, results[0].password)) {
                    res.status(200).json({
                        "token": auth.encodeToken(results[0].customer_id)
                    });
                } else {
                    res.sendStatus(401);
                }
            } else if ((email === _dummy_email && password === _dummy_password) && !(typeof email === UNDEFINED && typeof password === UNDEFINED)) {
                res.status(200).json({
                    "token": auth.encodeToken(_dummy_customer_id),
                });
            } else {
                res.sendStatus(401);
            }
        }
    });
});

router.post('/register', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var _invalid_email = process.env.APP_INVALID_EMAIL;
    var _dummy_email = process.env.APP_EMAIL;
    var _dummy_password = process.env.APP_PASSWORD;

    console.dir(req.body);
    console.log("email: " + email);
    console.log("password: " + password);

    if (email !== _invalid_email) {
        if (email !== _dummy_email && password !== _dummy_password) {
            db.query('INSERT INTO customer (email, password) VALUES (?, ?);', [email, bCrypt.hashSync(password, salt)], function (error) {
                if (error) {
                    res.sendStatus(401);
                } else {
                    res.status(200).json({
                        "email": email,
                        "password": password
                    });
                }
            });
        } else {
            res.status(200).json({
                "email": email,
                "password": password
            });
        }
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;