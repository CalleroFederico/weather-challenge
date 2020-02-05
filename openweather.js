const http = require('http');
var promise = require('bluebird');
const access_key = '74e53b778a8b6c8f455c8b9d2a920958';

var getData = {
  'getCurrent': function (d) {
    return ( d.cod == 200 ) ? { cod: d.cod, data: d.list[0], city: d.city } : d;
  },
  'getFive': function (d) {
    return ( d.cod == 200 ) ? { cod: d.cod, data: d.list, city: d.city } : d;
  }
};

var getCurrent = function (city) {
  return getWeather(city, 'getCurrent');
};

var getFive = function (city) {
  return getWeather(city, 'getFive');
};

var getWeather = function (city, parseResponse) {
  if (typeof city === 'object'){
    city = city.city;
  }
  return new promise (function (res, rej) {
    var queryString = 'http://api.openweathermap.org/data/2.5/forecast?q='+ city +'&APPID='+ access_key;
    http.get(queryString, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        res(getData[parseResponse](JSON.parse(data)));
      });
    }).on("error", (err) => {
      rej(err.message);
    });
  });
};

module.exports = {
  getCurrent: getCurrent,
  getFive: getFive
}


