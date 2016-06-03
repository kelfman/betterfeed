import assign from 'object-assign';
import auth from 'basic-auth';
import express from 'express';
import mongoose, {Types} from 'mongoose';
import User from './models/user.js';
import Story from './models/story.js';
import storiesSrvc from './services/stories.js';
import usersSrvc from './services/users.js';


module.exports = function(passport) {

  const router = express.Router();

  //////////
  // AUTH //
  //////////

  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });

  passport.deserializeUser(function(email, done) {
    User.findOne({email}, function(err, user) {
      done(err, user);
    });
  });


  router.route('/signup')

    .post(function(req, res, next) {
      passport.authenticate('local-signup', (err, user) => {
        res.json({ user });
      })(req, res, next);
    });


  router.route('/login')

    .post(function(req, res, next) {
      passport.authenticate('local-login', (err, user) => {
        req.logIn(user, (err) => {
          if (err) return next(err);
          res.json({ user });
        });
      })(req, res, next);
    });


  router.route('/logout')

    .get(function(req, res) {
      req.logout();
      res.redirect('/login');
    });


  ///////////
  // USERS //
  ///////////

  router.route('/users')

    .get(function(req, res) {
      usersSrvc
        .fetchAll()
        .then((users) => res.json({users}))
        .catch((err) => res.send(err));
    })

    .post(function(req, res) {
      const {email, password, blurb} = req.body;
      usersSrvc
        .createUser(email, password, blurb)
        .then((success) => res.json(success))
        .catch((err) => res.send(err));
    });


  router.route('/users/:email')

    .get(function(req, res) {
      const {email} = req.params;
      usersSrvc
        .getUserByEmail(email)
        .then((user) => res.json({user}))
        .catch((err) => res.send(err));
    })

    .put(function(req, res) {
      const {email} = req.params;
      const {blurb} = req.body;
      usersSrvc
        .updateBlurb(email, blurb)
        .then((success) => res.json(success))
        .catch((err) => res.send(err));
    });


  /////////////
  // STORIES //
  /////////////

  router.route('/stories')

    .get(function(req, res) {
      storiesSrvc
        .fetchAll()
        .then((stories) => res.json({stories}))
        .catch((err) => res.send(err));
    })

    .post(function(req, res) {
      const {user_id, content} = req.body;
      storiesSrvc
        .createStory(user_id, content)
        .then((success) => res.json(success))
        .catch((err) => res.send(err));
    });


  //////////
  // MISC //
  //////////

  router.route('/delete-everything')

    .delete(function(req, res) {
      Story.remove({}, (err) => {
        if (err) res.send(err);
        User.remove({}, (err) => {
          if (err) res.send(err);
          res.json({ message: 'Everything is deleted' });
        });
      });
    });


  return router;
};
