var settings = require('../config/config.json');
const moment = require('moment');
const jwt = require('jwt-simple');

function encodeToken(customer_id) {
    const payload = {
        exp: moment().add(2, 'days').unix(),
        iat: moment().unix(),
        customer_id: customer_id
    };
    return jwt.encode(payload, settings.secretKey);
}

module.exports = {
    encodeToken,
};