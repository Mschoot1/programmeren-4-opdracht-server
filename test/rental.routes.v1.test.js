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

    it('returns 0 on GET /api/v1/rentals/customer/:customer_id when logged in', function (done) {
        chai.request(server)
            .get('/api/v1/rentals/customer/' + customer_id)
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                console.dir(err);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('array').with.lengthOf(0);
                done();
            });
    });

    it('returns error on GET /api/v1/rentals/customer/:customer_id when logged in', function (done) {
        chai.request(server)
            .get('/api/v1/rentals/customer/' + customer_id)
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                console.dir(err);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('array').with.lengthOf(0);
                done();
            });
    });

    it('returns a body on POST /api/v1/rentals/:customer_id/:inventory_id when logged in', function (done) {
        var customer_id = process.env.CUSTOMER_ID;
        var inventory_id = process.env.INVENTORY_ID;

        chai.request(server)
            .post('/api/v1/rentals/' + customer_id + "/" + inventory_id)
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                console.dir(err);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('customer_id').that.is.a('string');
                res.body.should.have.property('inventory_id').that.is.a('string');
                done();
            });
    });

    it('returns ER_NO_REFERENCED_ROW_2 on POST /api/v1/rentals/:customer_id/:inventory_id when logged in', function (done) {
        chai.request(server)
            .post('/api/v1/rentals/-1/-1')
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                console.dir(err);
                res.should.have.status(401);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('code').that.is.a('string').equal("ER_NO_REFERENCED_ROW_2");
                done();
            });
    });

    it('returns a body on PUT /api/v1/rentals/:inventory_id when logged in', function (done) {
        var inventory_id = process.env.INVENTORY_ID;

        chai.request(server)
            .put('/api/v1/rentals/' + inventory_id)
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                console.dir(err);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('inventory_id').that.is.a('string').equal(inventory_id);
                res.body.should.have.property('return_date').that.is.a('string');
                done();
            });
    });

    it('returns a body on DELETE /api/v1/rentals/:customer_id/:inventory_id when logged in', function (done) {
        var customer_id = process.env.CUSTOMER_ID;
        var inventory_id = process.env.INVENTORY_ID;

        chai.request(server)
            .delete('/api/v1/rentals/' + customer_id + "/" + inventory_id)
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                console.dir(err);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('customer_id').that.is.a('string').equal(customer_id);
                res.body.should.have.property('inventory_id').that.is.a('string').equal(inventory_id);
                done();
            });
    });
});
