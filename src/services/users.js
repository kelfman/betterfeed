import request from 'superagent';
import config from '../../config.js';

export default {

  getProfile: function(email) {
    return new Promise((resolve, reject) => {
      request
        .get(config.baseUrl + '/api/users/' + email)
        .type('json')
        .send()
        .end((err, res) => {
          if (err || !res.body || !res.body.user) {
            reject();
          } else {
            resolve(res.body.user);
          }
        });
    })
  }

};
