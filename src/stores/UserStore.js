import alt from '../alt.js';
import UserActions from '../actions/UserActions.js';


class UserStore {
  constructor() {
    this.bindListeners({
      setCurrentUser: UserActions.SET_CURRENT_USER,
      formInvalid: UserActions.FORM_INVALID,
      setProfile: UserActions.SET_PROFILE
    });

    this.on('init', () => {
      this.currentUser = {};
      this.formInvalid = false;
      this.user = {};
    });
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }

  formInvalid(isInvalid) {
    this.formInvalid = isInvalid;
  }

  setProfile(user) {
    this.user = user;
  }
}

module.exports = alt.createStore(UserStore, 'UserStore');
