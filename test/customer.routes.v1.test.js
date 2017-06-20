process.env.NODE_ENV = 'test';
process.env.APP_EMAIL = 'email@live.nl';
process.env.APP_PASSWORD = 'test';
process.env.CUSTOMER_ID = '0';
process.env.INVENTORY_ID = '0';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

var customer_id = process.env.CUSTOMER_ID;

chai.use(chaiHttp);

describe('rental routes api v1', function () {

    before(function (done) {
        var user = {
            email: process.env.APP_EMAIL,
            password: process.env.APP_PASSWORD
        };
        chai.request(server)
            .post('/api/v1/login')
            .send(user)
            .end(function (err, res) {
                res.body.should.be.an('object');
                res.body.should.have.property('token');
                token = res.body.token;
                done();
            });
    });

});
