var express = require('express');
var routes = express.Router();
var db = require('../config/db');

routes.get('/rentals/inventory/:inventory_id', function (req, res) {
    var inventory_id = req.params.inventory_id;
    res.contentType('application/json');
    db.query('SELECT * FROM rental WHERE inventory_id = ? AND ISNULL(return_date) LIMIT 10;', [inventory_id], function (error, rows) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({result: rows});
        }
    });
});

routes.get('/rentals/customer/:customer_id', function (req, res) {
    var customer_id = req.params.customer_id;
    res.contentType('application/json');
    db.query('SELECT rental_id, rental_date, inventory.inventory_id, customer_id, rental.return_date, film.title ' +
    'FROM rental ' +
    'JOIN inventory ON inventory.inventory_id = rental.inventory_id ' +
    'JOIN film ON film.film_id = inventory.film_id ' +
    'WHERE rental.customer_id = ? ' +
    'ORDER BY ISNULL(return_date) DESC , return_date DESC , rental.inventory_id ASC;', [customer_id], function (error, rows) {
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
                    "customer_id": parseInt(customer_id),
                    "inventory_id": parseInt(inventory_id)
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

routes.put('/rentals/:inventory_id', function (req, res) {
    var return_date = new Date().toISOString();
    var inventory_id = req.params.inventory_id;
    db.query('UPDATE rental SET return_date = ? WHERE inventory_id = ? AND ISNULL(return_date);', [return_date, inventory_id], function (error) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({
                "return_date": return_date,
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