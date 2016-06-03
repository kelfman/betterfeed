import alt from '../alt.js';
import authSrvc from '../services/auth.js';
import usersSrvc from '../services/users.js';


class UserActions {
  signup(email, password) {
    return (dispatch) => {
      dispatch();
      authSrvc
        .signup(email, password)
        .then(() => {
          this.formInvalid(false);
          this.login(email, password);
        })
        .catch(() => {
          this.formInvalid(true);
        });
    };
  }

  login(email, password) {
    return (dispatch) => {
      dispatch();
      authSrvc
        .login(email, password)
        .then((user) => {
          this.formInvalid(false);
          this.setCurrentUser(user);
        })
        .catch(() => {
          this.formInvalid(true);
        });
    };
  }

  setCurrentUser(user) {
    return user;
  }

  getProfile(email) {
    return (dispatch) => {
      dispatch();
      usersSrvc
        .getProfile(email)
        .then(this.setProfile);
    };
  }

  setProfile(user) {
    return user;
  }

  formInvalid(isInvalid) {
    return isInvalid;
  }
}

module.exports = alt.createActions(UserActions);
