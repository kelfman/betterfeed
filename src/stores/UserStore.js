import alt from '../alt.js';
import UserActions from '../actions/UserActions.js';

class UserStore {
  constructor() {
    this.bindListeners({
      setCurrentUser: UserActions.SET_CURRENT_USER,
      formInvalid: UserActions.FORM_INVALID
    });

    this.on('init', () => {
      this.currentUser = {};
      this.formInvalid = false;
    });
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }

  formInvalid(isInvalid) {
    this.formInvalid = isInvalid;
  }
}

module.exports = alt.createStore(UserStore, 'UserStore');
