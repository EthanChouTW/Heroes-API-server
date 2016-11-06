const request = require('request');
const networking = require('../Networking');

const functions = {};

functions.heroesList = (req, res) => {

  networking.getDataFromURL(`heroes`)
    .then((heroesList) => {

      checkAuthorization(heroesList, req, res);
    })
    .catch((error) => {
      res.json(error);
    });
};

functions.singleHero = (req, res) => {

  let heroId = req.params.heroId;
  networking.getDataFromURL(`heroes/${heroId}`)
    .then((singleHero) => {
      checkAuthorization(singleHero, req, res);
    })
    .catch((error) => {
      res.json(error);
    });
};

module.exports = functions;

function checkAuthorization(result, req, res) {
  // collect promises
  let promises;

  if (req.isAuthenticate) {

    if (typeof req.params["heroId"] === 'undefined') { //list all heroes
      // add profile for every hero with secret data
      promises = result.map((element) => {

        const heroId = element['id'];

        return networking.getDataFromURL(`heroes/${heroId}/profile`)
          .then((profile) => {

            element["profile"] = profile;

            return element;
          })
          .catch((errorMessage) => {

            return element;
          });

      });

    } else { // single heroes

      promises = [networking.getDataFromURL(`heroes/${req.params.heroId}/profile`).then((profile) => {

        result["profile"] = profile

        return result;
      }).catch((error) => {

        return result;
      })];

    }

    // call the promise there, whether it single or list
    Promise.all(promises)
      .then(results => {
        res.json(result);
      })
      .catch(err => { // if error, send public data for user
        res.json(result);
      });
  } else { // is not authenticate
    if (!req.authErrorMessage) { // without Name and Password
      res.json(result);
    } else { // invalid Name and Password
      if (!req.params["heroId"]) { // heroes list, typeof result is array
        result.map(element => {
          element['profile'] = req.authErrorMessage;
          return element;
        })
      } else { // single hero typeof result is dictionary
        result['profile'] = req.authErrorMessage;
      }

      res.json(result);
    }
  }
}


