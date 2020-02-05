const http = require('http');
var promise = require('bluebird');
//API Key
const access_key = '3bda6631c756fa0d546ede5e5cfdad5c';

//HTTP Basico Request Handler.
var getIpApi = function (ip) {
  return new promise (function (res, rej) {
    //Formacion de Querystring.
    var queryString = 'http://api.ipapi.com/api/'+ ip +'?access_key='+ access_key;
    http.get(queryString, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        data = JSON.parse(data);
        res({ city: data.city, lat: data.latitude, lon: data.longitude, id: data['location'].geoname_id });
      });
    }).on("error", (err) => {
      rej(err.message);
    });
  });
};

module.exports = {
  getIpApi: getIpApi
}
