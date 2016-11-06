const request = require('request');

const url = 'http://hahow-recruit.herokuapp.com';
const networking = {};

networking.getDataFromURL = (urlSuffex =>
  new Promise((resolve, reject) => {
    request.get(
      `${url}/${urlSuffex}`, {},
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(JSON.parse(body));
        } else {
          reject(body);
        }
      }
    );
  })
);

networking.checkAuthenticateFromHahowAPI = (userData =>
  new Promise((resolve, reject) => {
    request.post(
      `${url}/auth`, { json: userData },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(body);
        } else {
          reject(response.statusCode);
        }
      }
    );
  })
);

module.exports = networking;
