const networking = require('../Networking');

const middlewareObj = {};

middlewareObj.checkAuthenticate = (req, res, next) => {
  const auth = {
    name: req.headers.name,
    password: req.headers.password,
  };

  if (typeof auth.name === 'undefined' && typeof auth.password === 'undefined') { // no passing header
    req.statusCode = 200;
    next();
  } else { // with header
    networking.checkAuthenticateFromHahowAPI(auth)
      .then(() => {
        req.isAuthenticatePass = true;
        next();
      }).catch((statusCode) => { // show error message for auth failure users
        req.isAuthenticatePass = false;
        req.statusCode = statusCode;
        next();
      });
  }
};

module.exports = middlewareObj;
