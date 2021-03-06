var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Film routes api v1', function () {
    it('returns an array on GET /api/v1/films', function (done) {
        chai.request(server)
            .get('/api/v1/films')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('result').that.is.an('array').that.is.length(0);
                done();
            });
    });

    it('returns a body on GET /api/v1/films/:id', function (done) {
        chai.request(server)
            .get('/api/v1/films/:filmdId')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('result').that.is.an('array');
                done();
            });
    });
});