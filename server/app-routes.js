import express from 'express';
import storiesSrvc from './services/stories.js';
import usersSrvc from './services/users.js';


const router = express.Router();


router.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    const {email} = req.session;
    usersSrvc
      .getUserByEmail(email)
      .then((user) => {
        res.locals.data = {
          UserStore: {
            currentUser: user
          }
        };
        next();
      });
  } else {
    res.redirect('/login');
  }
});


router.route('/')
  .get(function(req, res, next) {
    storiesSrvc
      .fetchAll()
      .then((stories) => {
        res.locals.data.StoriesStore = { stories };
        next();
      })
      .catch((err) => res.send(err));
  });


router.route('/users/:email')
  .get(function(req, res, next) {
    const {email} = req.params;
    usersSrvc
      .getUserByEmail(email)
      .then((user) => {
        res.locals.data.UserStore.user = user;
        next();
      })
      .catch((err) => res.send(err));
  });


export default router;
