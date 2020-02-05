const http = require('http');
var promise = require('bluebird');
//API Key
const access_key = '74e53b778a8b6c8f455c8b9d2a920958';

//Parser de respuestas.
var getData = {
  'getCurrent': function (d) {
    return ( d.cod == 200 ) ? { cod: d.cod, data: d.list[0], city: d.city } : d;
  },
  'getFive': function (d) {
    return ( d.cod == 200 ) ? { cod: d.cod, data: d.list, city: d.city } : d;
  }
};

//Invocar handler para /current
var getCurrent = function (city) {
  return getWeather(city, 'getCurrent');
};

//Invocar handler para /forecast
var getFive = function (city) {
  return getWeather(city, 'getFive');
};

//HTTP Basico Request Handler
var getWeather = function (city, parseResponse) {
  if (typeof city === 'object'){
    city = city.city;
  }
  return new promise (function (res, rej) {
    //Formar querystring
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


