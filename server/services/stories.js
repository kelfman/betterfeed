import mongoose, {Types} from 'mongoose';
import User from '../models/user.js';
import Story from '../models/story.js';


export default {

  fetchAll: function() {
    return new Promise((resolve, reject) => {
      Story.find().sort({created: -1}).find((err, stories) => {
        if (err) reject(err);

        if (!stories) resolve([]);

        const userIds = stories.map((story) => Types.ObjectId(story.user_id));

        User.find({_id: {$in: userIds}}, (err, users) => {
          if (err) reject(err);

          stories = stories.map((story) => {
            for (let i in users) {
              if (users[i]._id + '' == story.user_id + '') {
                story._doc.user = users[i]._doc;
                break;
              }
            }
            return story;
          });

          resolve(stories);
        });

      });
    });
  },

  createStory: function(user_id, content) {
    return new Promise((resolve, reject) => {
      const story = new Story();
      story.user_id = Types.ObjectId(user_id);
      story.content = content;

      story.save((err, story) => {
        if (err) reject(err);

        User.findById(story.user_id, (err, user) => {
          if (err) reject(err);

          user.story_ids.push(story._id);

          user.save((err) => {
            if (err) reject(err);

            resolve({ message: 'Story created' });
          });
        });
      });
    });
  }

}
