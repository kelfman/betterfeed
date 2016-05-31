import alt from '../alt.js';
import StoriesActions from '../actions/StoryActions.js';

class StoriesStore {
  constructor() {
    this.bindListeners({
      addStory: StoryActions.ADD_STORY,
      updateStories: StoryActions.UPDATE_STORIES
    });

    this.on('init', () => {
      this.stories = [];
    });
  }

  updateStories(stories) {
    this.stories = stories;
  }

  addStory(story) {
    this.stories.push(story);
  }
}

module.exports = alt.createStore(StoriesStore, 'StoriesStore');
