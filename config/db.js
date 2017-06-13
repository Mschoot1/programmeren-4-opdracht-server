//
// ./config/db.js
//
var mysql = require('mysql');
var config = require('../config/config');

var connectionSettings = {
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDatabase,
    debug: false
}

var connection = mysql.createConnection(connectionSettings);

connection.connect(function(error) {
    if (error) {
        console.error("Error connecting to database " + connectionSettings.database + " on " + connectionSettings.host + ": " + error.message);
    } else {
        console.log("Connected to database " + connectionSettings.database + " on " + connectionSettings.host);
    }
});

var module;
module.exports = connection;