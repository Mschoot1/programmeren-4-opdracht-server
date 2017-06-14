process.env.NODE_ENV = 'test';
process.env.APP_EMAIL = 'email@live.nl';
process.env.APP_PASSWORD = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Auth API v1', function () {

    before(function(done) {
        var user = {
            email: process.env.APP_EMAIL,
            password: process.env.APP_PASSWORD
        };
        chai.request(server)
            .post('/api/v1/login')
            .send(user)
            .end(function(err, res) {
                res.body.should.be.an('object');
                res.body.should.have.property('token');
                token = res.body.token;
                done();
            });
    });

    it('should returns all rentals for specific customer when logged in', function (done) {
        chai.request(server)
            .get('/api/v1/rentals/:customer_id')
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res) {
                console.dir(err);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('array').with.lengthOf(0);
                done();
            });
    });
});