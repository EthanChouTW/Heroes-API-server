
let middlewareObj = {}

middlewareObj.checkAuthenticate = function (req, res, next) {
    let auth = {
      name: req.headers.name,
      password: req.headers.password
    }
    if (typeof auth.name === 'undefined' && typeof auth.password == 'undefined') {
      req.isAuthenticate = false;
      next();
    }

    req.isAuthenticate = true;
    next();

};


module.exports = middlewareObj
