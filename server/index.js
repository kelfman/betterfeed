import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import Iso from 'iso';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import React from 'react';
import session from 'express-session';
import {match, RouterContext} from 'react-router';
import {renderToString} from 'react-dom/server';

import alt from '../src/alt.js';
import config from '../config.js';
import appRoutes from '../src/routes.jsx';
import apiRoutes from './routes.js';


mongoose.connect(config.mongoUri);


require('./passport')(passport);


const app = express();
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secretsession',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/login');
}

app.get('/', isLoggedIn);
app.use('/api', apiRoutes(passport));


app.use(function(req, res) {
  match({routes: appRoutes, location: req.url}, function(error, redirectLocation, renderProps) {
    if (renderProps) {
      const iso = new Iso();
      alt.bootstrap(JSON.stringify(res.locals.data || {}));
      const componentString = renderToString(<RouterContext {...renderProps} />);
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


app.listen(8080, function() {
  console.log('Listening on localhost:8080');
});
