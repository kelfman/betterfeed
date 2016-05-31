import alt from '../alt.js';
import config from '../../config.js';
import request from 'superagent';


class StoryActions {
  loadAllStories() {
    request.get(config.baseUrl+'/api/stories', (err, response) => {
      this.actions.updateStories(response.body);
    });
  }

  submitStory(story) {
    request.get(config.baseUrl+'/api/stories', (err, response) => {
      this.actions.addStory(response.body);
    });
  }

  addStory(story) {

  }

  updateStories(stories) {
    this.dispatch(stories);
  }
}

module.exports = alt.createActions(PostActions);
