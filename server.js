var fs   = require('fs');
var path = require('path');
var http = require('http');

const ipCall = require('./ipapi');
const w = require ('./openweather');

var bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.set('trust proxy',true);

app.use(bodyParser.json());
app.use (function (error, req, res, next){
   //Catch json error
   res.sendStatus(400);
});

app.use(express.static(__dirname));

app.get('/v1/', function(req, res) {
  res.jsonp({ a: 'a' }).end();
});

app.get('/v1/location', function(req, res) {
  ipCall.getIpApi(req.ip)
    .then(function (r) {
      res.jsonp(r).end();
    })
  .catch(function (e) {
    console.log(e);
    res.status(400).end();
  });
});

app.get('/v1/current', function(req, res) {
  ipCall.getIpApi(req.ip)
    .then(w.getCurrent)
    .then(function (r) {
      res.jsonp(r);
    })
  .catch(function (e) {
    console.log(e);
    res.status(400).end();
  });
});

app.get('/v1/current/:city', function(req, res) {
  var city = req.params.city;
  w.getCurrent({ city: city })
    .then(function (r) {
       res.jsonp(r);
    })
  .catch(function (r) {
    res.status(400).end();
  });
});

app.get('/v1/forecast', function(req, res) {
  ipCall.getIpApi(req.ip)
    .then(w.getFive)
    .then(function (r) {
      res.jsonp(r);
    })
  .catch(function (e) {
    res.status(400).end();
  });
});

app.get('/v1/forecast/:city', function(req, res) {
  var city = req.params.city;
  w.getFive({ city: city })
    .then(function (r) {
       res.jsonp(r);
    })
  .catch(function (r) {
    res.status(400).end();
  });
});

var server = http.createServer(app);
var port = '5051';

server.listen(port, () => {
  console.log("server starting on port : " + port)
});

module.exports = app;