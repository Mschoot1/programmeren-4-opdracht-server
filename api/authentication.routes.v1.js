//
// ./api/authentication.routes.v1.js
//
var express = require('express');
var router = express.Router();

var auth = require('../auth/authentication');

router.post('/login', function(req, res) {

    console.dir(req.body);

    var username = req.body.username;
    var password = req.body.password;

    var _dummy_username = "username";
    var _dummy_password = "test";

    if (username === _dummy_username && password === _dummy_password) {
        var token = auth.encodeToken(username);
        res.status(200).json({
            "token": token,
        });
    } else {
        console.log('Input: username = ' + username + ', password = ' + password);
        res.status(401).json({ "error": "Invalid credentials, bye" })
    }

});

module.exports = router;