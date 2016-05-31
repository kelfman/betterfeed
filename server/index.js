import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import Iso from 'iso';
import path from 'path';
import React from 'react';
import session from 'express-session';
import {match, RouterContext} from 'react-router';
import {renderToString} from 'react-dom/server';

import alt from '../src/alt.js';
import appRoutes from '../src/routes.jsx';
import apiRoutes from './routes.js';


var app = express();
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '../public')));
app.use(session({secret: 'mysecret', resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit : '50mb'}));
app.use(cookieParser());
app.use('/', apiRoutes);

app.use(function(req, res) {
  match({routes: appRoutes, location: req.url}, function(error, redirectLocation, renderProps) {
    if (renderProps) {
      var iso = new Iso();

      alt.bootstrap(JSON.stringify(res.locals.data || {}));

      var componentString = renderToString(<RouterContext {...renderProps} />);

      iso.add(componentString, alt.flush());

      res
        .status(200)
        .render('index', {content: iso.render()});
    }
    else if (redirectLocation) {
      res
        .redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    else if (error) {
      res
        .status(500)
        .send(error.message);
    }
    else {
      res
        .status(404)
        .send('Not found');
    }
  });
});

app.listen(8080, function () {
  console.log('Listening on localhost:8080');
});
