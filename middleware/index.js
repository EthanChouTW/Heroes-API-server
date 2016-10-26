let request = require('request');
let middlewareObj = {}

middlewareObj.checkAuthenticate = (req, res, next) => {
    let auth = {
      name: req.headers.name,
      password: req.headers.password
    }

    if (typeof auth.name === 'undefined' && typeof auth.password == 'undefined') {
      req.isAuthenticate = false;
      next();
    } else {

      checkAuthenticateFromHahowAPI(auth).then((body) => {

        req.isAuthenticate = true;

        next();
      }).catch((body) => { // show error message for auth failure users
        req.isAuthenticate = false;
        req.authErrorMessage = body;
        next()
      })
    }


};


function checkAuthenticateFromHahowAPI(userData){
  return new Promise((resolve, reject) => {

  request.post(
    'https://hahow-recruit.herokuapp.com/auth',
    { json: userData },
    (error, response, body) => {
        if (!error && response.statusCode == 200) {

            resolve(body);
        } else {

            reject(body);
        }
    }
  );
 });
}



module.exports = middlewareObj
