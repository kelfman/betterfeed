import alt from '../alt.js';
import config from '../../config.js';
import request from 'superagent';


class UserActions {
  signup(email, password) {
    return (dispatch) => {
      dispatch();
      request
        .post(config.baseUrl + '/api/signup')
        .type('json')
        .send({email, password})
        .end((err, res) => {
          if (err || !res.ok) {
            this.formInvalid();
          } else {
            this.setCurrentUser(res.body.user);
          }
        });
    };
  }

  login(email, password) {
    return (dispatch) => {
      dispatch();
      request
        .post(config.baseUrl + '/api/login')
        .type('json')
        .send({email, password})
        .end((err, res) => {
          if (err || !res.ok) {
            this.formInvalid();
          } else {
            this.setCurrentUser(res.body.user);
          }
        });
    };
  }

  setCurrentUser(user) {
    return user;
  }

  formInvalid() {
    return true;
  }
}

module.exports = alt.createActions(UserActions);
