'use strict';
module.exports = () => {
    let express = require('express'),
        path = require('path'),
        seed = require('./seed'),
        routes = require('./routes'),
        middleware = require('./middleware'),

        app = express();


    app.set('port', process.env.PORT || 3000);
    app.get('/heroes', middleware.checkAuthenticate, routes.heroesList);
    app.get('/heroes/:heroId', middleware.checkAuthenticate, routes.singleHero);

    return app;
};
