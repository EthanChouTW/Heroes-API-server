module.exports = function () {
  var express = require('express');
  var path = require('path');
  var seed = require("./seed");
  var routes = require('./routes');
  var middleware = require('./middleware');
  var app = express();


  app.set('port', process.env.PORT || 3000);
  app.get('/heroes', middleware.checkAuthenticate, routes.heroesList);
  app.get('/heroes/:heroId', middleware.checkAuthenticate, routes.singleHero);

  return app;
}