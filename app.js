module.exports = function () {
  var express = require('express');
  var path = require('path');
  var seed = require("./seed");
  var routes = require('./routes')(seed);
  var app = express();

  app.set('port', process.env.PORT || 3000);
  app.get('/heroes', routes.heroes);

  return app;
}