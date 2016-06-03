import alt from '../alt.js';
import StoriesActions from '../actions/StoriesActions.js';


class StoriesStore {
  constructor() {
    this.bindListeners({
      updateStories: StoriesActions.UPDATE_STORIES,
      incrementPostsCount: StoriesActions.INCREMENT_POSTS_COUNT
    });

    this.on('init', () => {
      this.stories = [];
      this.newPostsCnt = 0;
    });
  }

  updateStories(stories) {
    this.stories = stories;
  }

  incrementPostsCount() {
    this.newPostsCnt += 1;
  }
}

module.exports = alt.createStore(StoriesStore, 'StoriesStore');
