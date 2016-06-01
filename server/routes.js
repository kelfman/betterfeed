import assign from 'object-assign';
import auth from 'basic-auth';
import express from 'express';
import mongoose, {Types} from 'mongoose';

import Story from './models/story.js';
import User from './models/user.js';


module.exports = function(passport) {

  const router = express.Router();

  //////////
  // AUTH //
  //////////

  router.route('/signup')

    .post(function(req, res, next) {
      passport.authenticate('local-signup', (err, user, info) => {
        res.json({ user });
      })(req, res, next);
    });


  router.route('/login')

    .post(function(req, res, next) {
      passport.authenticate('local-login', (err, user, info) => {
        res.json({ user });
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

    .post(function(req, res) {
      const user = new User();
      user.email = req.body.email;
      user.password = req.body.password;
      user.blurb = req.body.blurb;
      user.save((err) => {
        if (err) res.send(err);
        res.json({ message: 'User created' });
      });
    })

    .get(function(req, res) {
      User.find((err, users) => {
        if (err) res.send(err);
        res.json(users);
      });
    });


  router.route('/users/:user_id')

    .get(function(req, res) {
      User.findById(req.params.user_id, (err, user) => {
        if (err) res.send(err);
        Story.find({_id: {$in: user.story_ids}}, (err, stories) => {
          if (err) res.send(err);
          user._doc.stories = stories
          res.json(user);
        });
      });
    })

    .put(function(req, res) {
      User.findById(req.params.user_id, (err, user) => {
        user.blurb = req.body.blurb;
        user.save((err) => {
          if (err) res.send(err);
          res.json({ message: 'User updated' });
        })
      });
    });


  /////////////
  // STORIES //
  /////////////

  router.route('/stories')

    .post(function(req, res) {
      const story = new Story();
      story.content = req.body.content;
      story.user_id = Types.ObjectId(req.body.user_id);
      story.save((err, story) => {
        if (err) res.send(err);
        User.findById(story.user_id, (err, user) => {
          if (err) res.send(err);
          user.story_ids.push(story._id);
          user.save((err) => {
            if (err) res.send(err);
            res.json({ message: 'Story created' });
          });
        });
      });
    })

    .get(function(req, res) {
      Story.find((err, stories) => {
        if (err) res.send(err);
        if (!stories) res.json([]);
        const userIds = stories.map((story) => Types.ObjectId(story.user_id));
        User.find({_id: {$in: userIds}}, (err, users) => {
          if (err) res.send(err);
          stories = stories.map((story) => {
            for (let i in users) {
              if (users[i]._id + '' == story.user_id + '') {
                story._doc.user = users[i]._doc;
                break;
              }
            }
            return story;
          });
          res.json(stories);
        });
      });
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
