//var request = require('request');

var supertest = require('supertest');
var server = require('../server.js');
global.request = supertest(server);
var chai = require('chai');
var expect = chai.expect;
describe('GET /plages', function() {
        it('returns a list of plages', function(done) {
            request.get('/plages')
                .expect(200)
                .end(function(err, res) {
					console.log(res);
                    expect(res.body).to.have.lengthOf(9);
                    done(err);
                });
        });
});
