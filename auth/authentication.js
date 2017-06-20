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

function decodeToken(token, cb) {

    try {
        const payload = jwt.decode(token, settings.secretKey);

        // Check if the token has expired. To do: Trigger issue in db ..
        const now = moment().unix();

        // Check if the token has expired
        if (now > payload.exp) {
            console.log('Token has expired.');
        }

        // Return
        cb(null, payload);

    } catch (err) {
        cb(err, null);
    }
}

module.exports = {
    encodeToken,
    decodeToken
};