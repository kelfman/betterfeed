import {Strategy as LocalStrategy} from 'passport-local';
import User from '../models/user.js';


export default function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });

  passport.deserializeUser(function(email, done) {
    User.findOne({email}, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
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
      req.session.email = user.email;
      return done(null, user);
    });
  }));

  passport.use('local', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, done) {
    console.log("DEBUG: wdwqd", req);
    // User.findOne({email}, function(err, user) {
    //   if (!user) {
    //     console.log("Login error: User not found");
    //     return done(null, false);
    //   }
    //   return done(null, user);
    // });
  }));

};
