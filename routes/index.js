const networking = require('../Networking');

function checkIfBackendError(result, res) {
  if (result.code === 1000) {
    res.status(500).send(result.message);
  }
}

function checkAuthorizationForHeroList(result, req, res) {
  checkIfBackendError(result, res);
  let promises;
  if (req.isAuthenticatePass) {
    // add profile for every hero with secret data
    promises = result.map((element) => {
      const heroId = element.id;
      return networking.getDataFromURL(`heroes/${heroId}/profile`)
        .then((profile) => {
          const newElement = element;
          newElement.profile = profile;
          return newElement;
        })
        .catch(element);
    });

    // call the promise there, whether it single or list
    Promise.all(promises)
      .then((newResult) => {
        res.status(200).json(newResult);
      })
      .catch(() => { // if error, send public data for user
        res.status(500).json(result);
      });
  } else {
    res.status(req.statusCode).json(result);
  }
}

function checkAuthorizationForSingleHero(result, req, res) {
  checkIfBackendError(result, res);
  if (req.isAuthenticatePass) {
    // add profile for every hero with secret data
    networking.getDataFromURL(`heroes/${req.params.heroId}/profile`)
      .then((profile) => {
        const newResult = result;
        newResult.profile = profile;
        res.status(200).json(newResult);
      })
      .catch(() => {
        res.status(500).json(result);
      });
  } else {
    res.status(req.statusCode).json(result);
  }
}

const functions = {};

functions.heroesList = (req, res) => {
  networking.getDataFromURL('heroes')
    .then((heroesList) => {
      checkAuthorizationForHeroList(heroesList, req, res);
    })
    .catch((errorMessage) => {
      res.status(404).send(errorMessage);
    });
};

functions.singleHero = (req, res) => {
  const heroId = req.params.heroId;
  networking.getDataFromURL(`heroes/${heroId}`)
    .then((singleHero) => {
      checkAuthorizationForSingleHero(singleHero, req, res);
    })
    .catch((errorMessage) => {
      res.status(404).send(errorMessage);
    });
};

module.exports = functions;

