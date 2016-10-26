var request = require('request');
let middlewareObj = {}

middlewareObj.checkAuthenticate = function (req, res, next) {
    let auth = {
      name: req.headers.name,
      password: req.headers.password
    }
    console.log(req.headers);

    if (typeof auth.name === 'undefined' && typeof auth.password == 'undefined') {
      req.isAuthenticate = false;
      next();
    } else {

      checkAuthenticateFromHahowAPI(auth).then(function(body){

        req.isAuthenticate = true;

        next();
      }).catch((body) => {

        res.json({status: body});
      })
    }


};


function checkAuthenticateFromHahowAPI(userData){
  return new Promise(function(resolve, reject){

  request.post(
    'https://hahow-recruit.herokuapp.com/auth',
    { json: userData },
    function (error, response, body) {
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
