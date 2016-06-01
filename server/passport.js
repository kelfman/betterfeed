var LocalStrategy = require('passport-local').Strategy;
import User from './models/user.js';


module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    console.log("DEBUG: Signup p2");
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {
      User.findOne({email}, function(err, user) {
        if (err) return done(err);
          if (user) {
            console.log("Signup error: Email already taken");
            return done(null, false);
          } else {
            const newUser = new User();
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save(function(err) {
              if (err) throw err;
              return done(null, newUser);
            });
          }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    User.findOne({email}, function(err, user) {
      if (err) return done(err);
      if (!user) {
        console.log("Login error: User not found");
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        console.log("Login error: Invalid password");
        return done(null, false);
      }
      return done(null, user);
    });

  }));
};
