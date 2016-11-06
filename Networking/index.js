const request = require('request');
const url = `http://hahow-recruit.herokuapp.com`;
let networking = {};

networking.getDataFromURL = (urlSuffex) => {

  return new Promise((resolve, reject) => {
    console.log(`${url}/${urlSuffex}`);

    request.get(
      `${url}/${urlSuffex}`, {},
      (error, response, body) => {

        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body));
        } else {
          reject(body);
        }
      }
    );
  });
};


module.exports = networking;