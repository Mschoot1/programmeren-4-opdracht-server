process.env.NODE_ENV = 'test';
process.env.APP_EMAIL = 'email@live.nl';
process.env.APP_PASSWORD = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Auth API v1', function () {

    it('returns an error on POST /api/v1/login with invalid credentials ', function (done) {
        var credentials = {
            email: "invalid"
        };
        chai.request(server)
            .post('/api/v1/login')
            .send(credentials)
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });

    it('returns a token on POST /api/v1/login with valid credentials', function (done) {
        var credentials = {
            email: process.env.APP_EMAIL,
            password: process.env.APP_PASSWORD
        };
        chai.request(server)
            .post('/api/v1/login')
            .send(credentials)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('token').that.is.a('string');
                done();
            });
    });
});