process.env.NODE_ENV = 'test';
process.env.APP_EMAIL = 'email@live.nl';
process.env.APP_INVALID_EMAIL = 'invalid';
process.env.APP_PASSWORD = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Inventory routes api v1', function () {

    it('returns a body on GET /api/v1/inventories/:film_id', function (done) {
        chai.request(server)
            .get('/api/v1/inventories/:film_id')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('array');
                done();
            });
    });
});