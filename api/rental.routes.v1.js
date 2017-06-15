var express = require('express');
var routes = express.Router();
var db = require('../config/db');

routes.get('/rentals/:customerId', function (req, res) {
    var customerId = req.params.customerId;
    res.contentType('application/json');
    db.query('SELECT * FROM rental WHERE customer_id = ? LIMIT 10;', [customerId], function (error, rows) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({result: rows});
        }
    });
});

routes.post('/rentals/:customer_id/:inventory_id', function (req, res) {
    var customer_id = req.params.customer_id;
    var inventory_id = req.params.inventory_id;

    var _dummy_customer_id = process.env.CUSTOMER_ID;
    var _dummy_inventory_id = process.env.INVENTORY_ID;

    if (customer_id !== _dummy_customer_id && inventory_id !== _dummy_inventory_id) {
        db.query('INSERT INTO rental (customer_id, inventory_id) VALUES (?, ?);', [customer_id, inventory_id], function (error) {
            if (error) {
                res.status(401).json(error);
            } else {
                res.status(200).json({
                    "customer_id": customer_id,
                    "inventory_id": inventory_id
                });
            }
        });
    } else {
        res.status(200).json({
            "customer_id": customer_id,
            "inventory_id": inventory_id
        });
    }
});

routes.put('/rentals/:customer_id/:inventory_id', function (req, res) {
    var return_date = req.body.return_date;

    var customer_id = req.params.customer_id;
    var inventory_id = req.params.inventory_id;

    db.query('UPDATE rental SET return_date = ? WHERE customer_id = ? AND inventory_id = ?;', [return_date, customer_id, inventory_id], function (error) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({
                "return_date": return_date,
                "customer_id": customer_id,
                "inventory_id": inventory_id
            });
        }
    });
});

routes.delete('/rentals/:customer_id/:inventory_id', function (req, res) {
    var customer_id = req.params.customer_id;
    var inventory_id = req.params.inventory_id;

    db.query('DELETE FROM rental WHERE customer_id = ? AND inventory_id = ?;', [customer_id, inventory_id], function (error) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({
                "customer_id": customer_id,
                "inventory_id": inventory_id
            });
        }
    });
});

module.exports = routes;