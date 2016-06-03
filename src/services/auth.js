import request from 'superagent';
import config from '../../config.js';

export default {

  signup: function(email, password) {
    return new Promise((resolve, reject) => {
      request
        .post(config.baseUrl + '/api/signup')
        .type('json')
        .send({email, password})
        .end((err, res) => {
          if (err || !res.body || !res.body.user) {
            reject();
          } else {
            resolve(res.body.user);
          }
        });
    })
  },

  login: function(email, password) {
    return new Promise((resolve, reject) => {
      request
        .post(config.baseUrl + '/api/login')
        .type('json')
        .send({email, password})
        .end((err, res) => {
          if (err || !res.body && !res.body.user) {
            reject();
          } else {
            resolve(res.body.user);
          }
        });
    })
  }

};
