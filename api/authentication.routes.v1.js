//
// ./api/authentication.routes.v1.js
//
var express = require('express');
var router = express.Router();
var db = require('../config/db.js');
var bCrypt = require('bcrypt');
var salt = bCrypt.genSaltSync(10);
var auth = require('../auth/authentication');
var config = require('../config/config.json');

router.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    db.query('SELECT email, password FROM customer WHERE email = ?', [email], function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.length > 0) {
                if (bCrypt.compareSync(password, results[0].password)) {
                    res.status(200).json({
                        "token": auth.encodeToken(results[0].email),
                    });
                } else {
                    res.status(401);
                }
            } else {
                res.status(401);
            }
        }
    });
});

router.post('/register', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    db.query('INSERT INTO customer (email, password) VALUES (?, ?);', [email, bCrypt.hashSync(password, salt)], function (error) {
        if (error) {
            if (error.code === "ER_DUP_KEY") {
                res.status(401);
            }
        } else {
            res.status(200).json({
                "message": "Successfully registered"
            });
        }
    });
});

module.exports = router;