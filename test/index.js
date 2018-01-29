let should = require("should");
let assert = require("assert");
let app = require('../app');
const request = require('supertest');
// Test cases
describe('POST /wishilist', function () {
    let body;
    before("HTTP request to add article", function (done) {
        return request(app)
            .post('/api/v1/wishlist')
            .send({
                'id': Math.floor((Math.random() * 10000) + 1),
                'name': "Adidas Shoes"
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                body = response.body;
                done();
            });
    });

    it('Should return success status after adding article', function () {
        should.exist(body);
        assert(body.status, 'Success');
    });
});

describe('DELETE /wishilist', function () {
    let id = Math.floor((Math.random() * 10000) + 1);
    let body;

    before("HTTP request to delete article", function (done) {
        return request(app)
            .post('/api/v1/wishlist')
            .send({
                'id': id,
                'name': "Adidas UA&SONS Urban Jacket"
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                request(app)
                    .delete('/api/v1/wishlist/' + id)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .then(response => {
                        body = response.body;
                        done();
                    });
            })
    });
    it('Should return success status after deleting article', function () {
        should.exist(body);
        assert(body.status, 'Success');
    });
});

describe('GET /wishilist', function () {
    let body;
    before("HTTP request to get wish list", function (done) {
        return request(app)
            .get('/api/v1/wishlist')
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                body = response.body;
                done();
            });
    });
    it('Should return wish list', function () {
        should.exist(body);
        assert(body.status, 'Success');
        body.data.should.not.have.length(0);
    });
});


describe('Check invalid route', function () {
    let body;
    before("HTTP request on invalid route", function (done) {
        return request(app)
            .get('/api/v1/incorrectwishlistpath')
            .set('Accept', 'application/json')
            .expect(404)
            .then(response => {
                body = response.body;
                done();
            });
    });
    it('Should return wish list', function () {
        should.exist(body);
        body.error.should.not.have.length(0);
    });
});