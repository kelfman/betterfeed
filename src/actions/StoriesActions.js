import alt from '../alt.js';
import storiesSrvc from '../services/stories.js';


class StoriesActions {
  loadAllStories() {
    return (dispatch) => {
      dispatch();
      storiesSrvc
        .fetchAll()
        .then(this.updateStories);
    };
  }

  submitStory(user_id, content) {
    return (dispatch) => {
      dispatch();
      storiesSrvc
        .post(user_id, content)
        .then(this.loadAllStories)
        .then(this.incrementPostsCount);
    };
  }

  updateStories(stories) {
    return stories;
  }

  incrementPostsCount() {
    return true;
  }
}

module.exports = alt.createActions(StoriesActions);
