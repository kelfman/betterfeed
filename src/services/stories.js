import request from 'superagent';
import config from '../../config.js';

export default {

  post: function(user_id, content) {
    return new Promise((resolve, reject) => {
      request
        .post(config.baseUrl + '/api/stories')
        .type('json')
        .send({user_id, content})
        .end((err, res) => {
          if (err || !res.ok) {
            reject();
          } else {
            resolve();
          }
        });
    });
  },

  fetchAll: function() {
    return new Promise((resolve, reject) => {
      request
        .get(config.baseUrl + '/api/stories')
        .type('json')
        .send()
        .end((err, res) => {
          if (err || !res.body) {
            reject();
          } else {
            resolve(res.body.stories);
          }
        });
    });
  }

};
