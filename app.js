const express = require('express');
const routes = require('./routes');
const middleware = require('./middleware');

module.exports = () => {
  const app = express();
  app.set('port', process.env.PORT || 3000);
  app.get('/heroes', middleware.checkAuthenticate, routes.heroesList);
  app.get('/heroes/:heroId', middleware.checkAuthenticate, routes.singleHero);
  return app;
};
