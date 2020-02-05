const request = require('supertest');
const should = require('should');
const app = require('./server.js');

/*
> weather-challenge@1.0.0 test C:\Users\fcallero\Desktop\ch
> mocha supertest.js



server starting on port : 5051
  GET /location
    √ Gets location (703ms)

  GET /current
    √ Gets location (1182ms)

  GET /current/:city
    √ Gets location (775ms)

  GET /current/:city 404
    √ Gets location (509ms)

  GET /forecast
    √ Gets location (1176ms)

  GET /forecast/:city
    √ Gets location (509ms)

  GET /forecast/:city 404
    √ Gets location (502ms)


  7 passing (5s)
  
*/

var isValidLocation = function(res) {
  res.body.should.have.property("city");
  res.body.should.have.property("lat");
  res.body.should.have.property("lon");
  res.body.should.have.property("id");
};

var isValidCurrent = function(res) {
console.log(res);
  res.body.should.have.property("cod");
  res.body.should.have.property("data");
};

var isValidCurrent404 = function(res) {
  res.body.should.have.property("cod", "404");
  res.body.should.have.property("message", "city not found");
};

var isValidForecast = function(res) {
  res.body.should.have.property("cod");
  res.body.should.have.property("data");
};

var isValidForecast404 = function(res) {
  res.body.should.have.property("cod", "404");
  res.body.should.have.property("message", "city not found");
};

/**
 * Testing get location endpoint
 */
describe('GET /location', function () {
    it('Gets location', function (done) {
        request(app)
            .get('/v1/location')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(isValidLocation)
            .expect(200, done);
    });
});

/**
 * Testing get current endpoint
 */
describe('GET /current', function () {
    it('Gets location', function (done) {
        request(app)
            .get('/v1/current')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(isValidCurrent)
            .expect(200, done);
    });
});

/**
 * Testing get current city endpoint
 */
describe('GET /current/:city', function () {
    it('Gets location', function (done) {
        request(app)
            .get('/v1/current/london')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(isValidCurrent)
            .expect(200, done);
    });
});

/**
 * Testing get current city 404 endpoint
 */
describe('GET /current/:city 404', function () {
    it('Gets location', function (done) {
        request(app)
            .get('/v1/current/ñuflo')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(isValidCurrent404)
            .expect(200, done);
    });
});

/**
 * Testing get forecast endpoint
 */
describe('GET /forecast', function () {
    it('Gets location', function (done) {
        request(app)
            .get('/v1/forecast')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(isValidForecast)
            .expect(200, done);
    });
});

/**
 * Testing get forecast city endpoint
 */
describe('GET /forecast/:city', function () {
    it('Gets location', function (done) {
        request(app)
            .get('/v1/forecast/london')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(isValidForecast)
            .expect(200, done);
    });
});

/**
 * Testing get forecast city 404 endpoint
 */
describe('GET /forecast/:city 404', function () {
    it('Gets location', function (done) {
        request(app)
            .get('/v1/forecast/ñuflo')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(isValidForecast404)
            .expect(200, done);
    });
});
