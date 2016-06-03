import mongoose, {Types} from 'mongoose';
import User from '../models/user.js';
import Story from '../models/story.js';


export default {

  fetchAll: function() {
    return new Promise((resolve, reject) => {
      User.find((err, users) => {
        if (err) reject(err);
        resolve(users);
      });
    });
  },

  createUser: function(email, password, blurb) {
    return new Promise((resolve, reject) => {
      const user = new User();
      user.email = email;
      user.password = password;
      user.blurb = blurb;
      user.save((err) => {
        if (err) reject(err);
        resolve({ message: 'User created' });
      });
    });
  },

  getUserByEmail: function(email) {
    return new Promise((resolve, reject) => {
      User.findOne({email}, (err, user) => {
        if (err) res.send(err);
        Story.find({_id: {$in: user.story_ids}}, (err, stories) => {
          if (err) reject(err);
          if (user._doc) {
            user._doc.stories = stories;
          } else {
            user.stories = stories;
          }
          resolve(user);
        });
      });
    });
  },

  updateBlurb: function(email, blurb) {
    return new Promise((resolve, reject) => {
      User.findOne({email}, (err, user) => {
        if (err) reject(err);
        user.blurb = blurb;
        user.save((err) => {
          if (err) reject(err);
          resolve({ message: 'User blurb updated' });
        })
      });
    });
  }

};
